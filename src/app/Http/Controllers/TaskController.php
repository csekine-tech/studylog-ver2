<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\Workbook;
use App\Models\Question;
use App\Models\Chapter;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\AutoTaskSetting;
use Illuminate\Support\Carbon;
use App\Http\Requests\TaskRequest;
use App\Http\Requests\BulkAddRequest;
use App\Http\Requests\updatePlanDateRequest;
use App\Http\Requests\SetRateRequest;
use Illuminate\Http\Exceptions\HttpResponseException;


class TaskController extends Controller
{
    public function store(TaskRequest $request)
    {
        //workbook_idとquestionnum,chapternumからqidを求める
        $chapter = Chapter::where('workbook_id', $request->input('workbook_id'))->where('number', $request->input('chapter_number'))->first();
        if (!is_null($chapter)) {
            $chapterId = $chapter->id;
            $q = Question::where('chapter_id', $chapterId)->where('number', $request->input('question_number'))->first();
            if (!is_null($q)) {
                $qId = $q->id;
                $task = new Task;
                $task->question_id = $qId;
                $task->user_id = Auth::user()->id;
                $task->planned_at = $request->input('selected_date');
                $task->save();

                $tasks = Task::where('question_id', $qId)->get();
                if ($tasks) {
                    $task = $tasks
                        ->where('done_at', null)
                        ->whereNotNull('planned_at')
                        ->sortBy('planned_at')
                        ->first();
                    if ($task) {
                        $q->next_plan_date = $task->planned_at;
                        $q->save();
                        return response()->json([
                            'status' => 200,
                            'message' => 'store task successfully!'
                        ]);
                    } else {
                        return response()->json([
                            'status' => 404,
                            'message' => 'no task'
                        ]);
                    }
                } else {
                    return response()->json([
                        'status' => 404,
                        'message' => 'no tasks'
                    ]);
                }
            }
        }
    }
    public function getList()
    {
        $tasks = Task::where('user_id', Auth::user()->id)
            ->orderByRaw('done_at is null desc')
            ->orderBy('planned_at', 'asc')
            ->get()->groupBy(['planned_at']);
        if ($tasks) {
            return response()->json([
                'status' => 200,
                'taskList' => $tasks,
                'message' => 'get taskList successfully!'
            ]);
        } else {
            return response()->json([
                'status' => 200,
                'taskList' => [],
                'message' => 'get none of taskList successfully!'
            ]);
        }
    }

    public function getTodaysList()
    {
        //日付フォーマットする
        $tasks = Task::where('user_id', Auth::user()->id)->where('done_at', null)->where('planned_at', Carbon::now()->format('Y-m-d'))->get();
        if ($tasks) {
            return response()->json([
                'status' => 200,
                'taskList' => $tasks,
                'message' => 'get Todays task successfully!'
            ]);
        } else {
            return response()->json([
                'status' => 200,
                'taskList' => [],
                'message' => 'get none of Todays task successfully!'
            ]);
        }
    }

    public function setRate(SetRateRequest $request)
    {
        $task = Task::where('user_id', Auth::user()->id)->find($request->input('id'));
        if ($task) {
            $task->done_at = $request->input('done_at');
            $task->rate = $request->input('rate');
            $task->save();
            $question = Question::where('user_id', Auth::user()->id)->find($task->question_id);
            if (!is_null($question)) {
                $question->counts = Task::where('user_id', Auth::user()->id)
                    ->where('question_id', $task->question_id)
                    ->whereNotNull('done_at')->get()->count();
                $question->last_rate = $request->input('rate');

                $maxRate = AutoTaskSetting::max('rate');
                $nextDate = null;
                if ($request->input('rate') === $maxRate) {
                    $question->is_finished = true;
                } else {
                    $newTask = new Task;
                    $addedDay = AutoTaskSetting::where('rate', $request->input('rate'))->first()->auto_set_day;
                    $nextDate = Carbon::parse($request->input('done_at'))->addDay($addedDay);
                    $newTask->planned_at = $nextDate;
                    $newTask->question_id = $task->question_id;
                    $newTask->user_id = Auth::user()->id;
                    $newTask->save();
                    $question->next_plan_date = Task::where('user_id', Auth::user()->id)
                        ->where('question_id', $task->question_id)
                        ->where('done_at', null)
                        ->orderBy('planned_at', 'asc')->first()->planned_at;
                }
                $question->save();
                $returnData = [];
                $returnData['nextDate'] = $nextDate;
                $returnData['rate'] = $request->input('rate');
                return response()->json([
                    'status' => 200,
                    'message' => 'set Rate successfully!',
                    'returnData' => $returnData
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'no question'
                ]);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no task'
            ]);
        }
    }
    public function updatePlanDate(updatePlanDateRequest $request)
    {
        if ($request->is_new === true) {
            $task = new Task;
            $task->question_id = $request->question_id;
            $task->user_id = Auth::user()->id;
            $task->planned_at = new Carbon($request->date);
            $task->save();
        } else {
            $task = Task::where('user_id', Auth::user()->id)->find($request->id);
            if (!is_null($task)) {
                $task->planned_at = new Carbon($request->date);
                $task->save();
            } else {
                return response()->json([
                    'status' => 200,
                    'message' => 'no task'
                ]);
            }
        }
        $question = Question::where('user_id', Auth::user()->id)->find($task->question_id);
        if (!is_null($question)) {
            $tasks = Task::where('user_id', Auth::user()->id)
                ->where('question_id', $question->id);
            if ($tasks) {
                $task = $tasks
                    ->where('done_at', null)
                    ->whereNotNull('planned_at')
                    ->orderBy('planned_at', 'asc')->first();
                if ($task) {
                    $question->next_plan_date = $task->planned_at;
                    $question->save();
                    return response()->json([
                        'status' => 200,
                        'message' => 'update plan date successfully!'
                    ]);
                } else {
                    return response()->json([
                        'status' => 404,
                        'message' => 'no planned_at'
                    ]);
                }
            } else {
                return response()->json([
                    'status' => 200,
                    'message' => 'no tasks'
                ]);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'no question'
            ]);
        }
    }

    public function bulkAdd(BulkAddRequest $request)
    {
        $authId = Auth::user()->id;
        $wid = $request->id;
        $start_date = new Carbon($request->start_date);
        $counts = $request->day_counts;
        $off_days = [];
        foreach ($request->off_day as $i => $bool) {
            if ($bool === true) {
                array_push($off_days, $i);
            }
        };
        if (count($off_days) < 7) {
            $is_override = boolval($request->is_override);
            $startYoubi = $start_date->dayOfWeek;
            $dateArray = [];
            $questionsCounts = "";
            $questions = [];
            $workbookWithQuestions = Workbook::where('id', $wid)
                ->with(['questions' => function ($query) {
                    $query->each(function ($query) {
                        $query->where('is_finished', false)
                            ->orderBy('number', 'asc')
                            ->orderBy('chapter_id', 'asc');
                    });
                }])->first();
            foreach ($workbookWithQuestions->questions as $question) {
                array_push($questions, $question);
            };
            $q = $questions;

            $questionsCounts = count($questions);

            $i = 0;
            while (count($dateArray) < ceil($questionsCounts / $counts)) {
                if (!in_array(($i + $startYoubi) % 7, $off_days, false)) {
                    // 0からquestion_countsまでの有効日数配列を作成する
                    array_push($dateArray, $i);
                }
                $i++;
            }
            $remainCounts = $questionsCounts;

            if ($is_override == true) {
                //既存のタスクを上書きする
                //done_atがnullで一番idがdescなタスクがある場合はそれを上書きする。なければ新規に作成する。

                foreach ($dateArray as $date) {
                    $j = $counts;
                    while ($j > 0) {
                        //1日に解く問題数が0
                        $question = array_shift($questions);
                        if (!$question->is_finished) {
                            $task = Task::where('done_at', null)->where('question_id', $question->id)
                                ->orderBy('planned_at', 'asc')->first();

                            $start_date = new Carbon($request->start_date);

                            if (is_null($task)) {
                                $newtask = new Task;
                                $newtask->question_id = $question->id;
                                $newtask->user_id = $authId;
                                $newtask->planned_at = $start_date->addDay($date);
                                $newtask->save();
                                $selectedQuestion = Question::find($question->id);
                                if ($selectedQuestion) {
                                    $selectedQuestion->next_plan_date = $newtask->planned_at;
                                    $selectedQuestion->save();
                                }
                            } else {
                                $task->planned_at = $start_date->addDay($date);
                                $task->save();
                                $selectedQuestion = Question::find($question->id);
                                if ($selectedQuestion) {
                                    $selectedQuestion->next_plan_date = Task::where('user_id', Auth::user()->id)
                                        ->where('question_id', $task->question_id)
                                        ->where('done_at', null)
                                        ->orderBy('planned_at', 'asc')->first()->planned_at;
                                    $selectedQuestion->save();
                                }
                            }
                            $j--;
                        }

                        $remainCounts--;

                        if ($remainCounts == 0) {
                            break;
                        }
                    }
                    if ($remainCounts == 0) {
                        break;
                    }
                }
            } else {
                foreach ($dateArray as $date) {
                    for ($j = 0; $j < $counts; $j++) {
                        $question = array_shift($questions);
                        if (!$question->is_finished) {

                            $task = new Task;
                            $task->question_id = $question->id;
                            $task->user_id = $authId;
                            $start_date = new Carbon($request->start_date);
                            $task->planned_at = $start_date->addDay($date);
                            $task->save();
                            $selectedQuestion = Question::find($question->id);
                            if ($selectedQuestion) {
                                $selectedQuestion->next_plan_date = Task::where('user_id', Auth::user()->id)
                                    ->where('question_id', $task->question_id)
                                    ->where('done_at', null)
                                    ->orderBy('planned_at', 'asc')->first()->planned_at;
                                $selectedQuestion->save();
                            }
                        }
                        $remainCounts--;
                        if ($remainCounts == 0) {
                            break;
                        }
                    }
                    if ($remainCounts == 0) {
                        break;
                    }
                }
            }

            return response()->json([
                'status' => 200,
                'q' => $q,
                'message' => 'bulk add tasks successfully!'
            ]);
        } else {
            $data = ['errors' => ['全ての曜日を選択することはできません']];
            throw new HttpResponseException(response()->json($data, 422));
        }
    }
}
