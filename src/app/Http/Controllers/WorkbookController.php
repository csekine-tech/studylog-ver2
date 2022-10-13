<?php

namespace App\Http\Controllers;

use App\Models\Chapter;
use Illuminate\Http\Request;
use App\Models\Workbook;
use App\Models\Question;
use App\Models\Subject;
use Illuminate\Support\Facades\Auth;
use App\Models\Result;
use App\Models\Task;
use App\Http\Requests\WorkbookRequest;
use App\Http\Requests\WorkbookImageRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Storage;
<<<<<<< HEAD

=======
>>>>>>> origin/main


class WorkbookController extends Controller
{
    /**
     * 問題集（workbook）を登録する。
     * 章（chapter）と問題（question）も自動生成する。
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(WorkbookRequest $request)
    {
        $workbook = new Workbook;
        $workbook->name = $request->input('workbook_name');
        $workbook->subject_id = $request->input('subject_id');
        $workbook->user_id = Auth::user()->id;
        $workbook->has_chapter = $request->input('has_chapter');
        $workbook->chapter_counts = $request->input('chapter_counts');
        $qc = 0;
        foreach ($request->input('chapters') as $chap) {
            $qc += $chap['question_counts'];
        }
        $workbook->question_counts = $qc;
        $workbook->save();


        foreach ($request->input('chapters') as $chap) {
            $chapter = new Chapter;
            $chapter->workbook_id = $workbook->id;
            $chapter->user_id = Auth::user()->id;
            $chapter->number = $chap['number'];
            $chapter->question_counts = $chap['question_counts'];
            $chapter->save();
            for ($i = 1; $i <= $chapter->question_counts; $i++) {
                $question = new Question;
                $question->chapter_id = $chapter->id;
                $question->user_id = Auth::user()->id;
                $question->number = $i;
                $question->save();
            }
        }
        return response()->json([
            'status' => 200,
            'id' => $workbook->id,
            'message' => 'store workbook successfully!'
        ]);
    }

    public function storeImg(WorkbookImageRequest $request)
    {
        $workbook = Workbook::find($request->id);
        if (!is_null($workbook) && $request->hasFile('image')) {
		//local
		$image=$request->file('image');
            if (app()->isLocal() || app()->runningUnitTests()) {
                $path = ltrim($image->store('public/workbook_images/'. $request->user()->id), 'public/');
            } else {
                //production
                //storeメソッド引数　1フォルダ（詳しくはパス名）2ディスク名
                $path = $image->store(
			'workbook_images/' . Auth::user()->id,
                    's3'
		    );
	    }

            $workbook->image_url = $path;
        }
        $workbook->save();

        return response()->json([
            'status' => 200,
            'message' => 'store workbook successfully!'
        ]);
    }

    public function update($id, WorkbookRequest $request)
    {
        $workbook = Workbook::where('user_id', Auth::user()->id)->find($id);
        if (!is_null($workbook)) {
            $ex_has_chapter = $workbook->has_chapter;
            $ex_chapter_counts = $workbook->chapter_counts;
            $ex_chapters = [];
            for ($i = 0; $i < $ex_chapter_counts; $i++) {
                $chapter = Chapter::where('workbook_id', $workbook->id)->where('number', $i + 1)->get()->first();
                if ($chapter) {
                    $obj = [
                        'number' => $i,
                        'question_counts' => $chapter->question_counts
                    ];
                    array_push($ex_chapters, $obj);
                }
            }
            $workbook->name = $request->input('workbook_name');
            $workbook->subject_id = $request->input('subject_id');
            $workbook->has_chapter = $request->input('has_chapter');
            $workbook->chapter_counts = $request->input('chapter_counts');
            $qc = 0;
            foreach ($request->input('chapters') as $chap) {
                $qc += $chap['question_counts'];
            }
            $workbook->question_counts = $qc;
            $workbook->save();

            //has_chapter 0->0の場合

            if (!$ex_has_chapter && !$request->input('has_chapter')) {
                $chapter = Chapter::where('workbook_id', $workbook->id)->where('number', 1)->get()->first();
                if (!is_null($chapter)) {
                    if ($chapter->question_counts > $request->input('chapters')[0]['question_counts']) {
                        //減る場合　削除する
                        for ($j = $chapter->question_counts; $j > $request->input('chapters')[0]['question_counts']; $j--) {
                            $question = Question::where('chapter_id', $chapter->id)->where('number', $j)->get()->first();
                            if ($question) {
                                Task::where('question_id', $question->id)->each(function ($task) {
                                    if ($task) {
                                        $task->delete();
                                    }
                                });
                                $question->delete();
                            }
                        }
                    } else {
                        //増える場合　追加する
                        for ($j = $chapter->question_counts + 1; $j <= $request->input('chapters')[0]['question_counts']; $j++) {
                            // $question = Question::where('chapter_id', $chapter->id)->where('number', $j)->get()->first();
                            $question = new Question;
                            $question->chapter_id = $chapter->id;
                            $question->user_id = Auth::user()->id;
                            $question->number = $j;
                            $question->save();
                        }
                    }
                    $chapter->question_counts = $request->input('chapters')[0]['question_counts'];
                    $chapter->save();
                }
            }


            //has_chapter 0->1の場合
            if ((!$ex_has_chapter && $request->input('has_chapter')) || ($ex_has_chapter && !$request->input('has_chapter'))) {
                //該当の章と問題を全削除からの再構築
                $workbook->chapters->each(function ($chapter) {
                    $chapter->questions->each(function ($question) {
                        Task::where('question_id', $question->id)->each(function ($task) {
                            $task->delete();
                        });
                        $question->delete();
                    });
                    $chapter->delete();
                });

                foreach ($request->input('chapters') as $chap) {
                    $chapter = new Chapter;
                    $chapter->workbook_id = $workbook->id;
                    $chapter->user_id = Auth::user()->id;
                    $chapter->number = $chap['number'];
                    $chapter->question_counts = $chap['question_counts'];
                    $chapter->save();
                    for ($i = 1; $i <= $chapter->question_counts; $i++) {
                        $question = new Question;
                        $question->chapter_id = $chapter->id;
                        $question->user_id = Auth::user()->id;
                        $question->number = $i;
                        $question->save();
                    }
                }
            }


            //has_chapter 1->1の場合
            if ($ex_has_chapter && $request->input('has_chapter')) {
                //章の数が増える場合
                //増えた章と問題を作成する
                if ($ex_chapter_counts < $request->input('chapter_counts')) {
                    foreach ($request->input('chapters') as $index => $chap) {
                        if ($chap['number'] > $ex_chapter_counts) {
                            $chapter = new Chapter;
                            $chapter->workbook_id = $workbook->id;
                            $chapter->user_id = Auth::user()->id;
                            $chapter->number = $chap['number'];
                            $chapter->question_counts = $chap['question_counts'];
                            $chapter->save();
                            for ($j = 1; $j <= $chapter->question_counts; $j++) {
                                $question = new Question;
                                $question->chapter_id = $chapter->id;
                                $question->user_id = Auth::user()->id;
                                $question->number = $j;
                                $question->save();
                            }
                        } else {
                            $chapter = Chapter::where('workbook_id', $workbook->id)->where('number', $chap['number'])->get()->first();
                            if ($chapter) {
                                $chapter->question_counts = $chap['question_counts'];
                                $chapter->save();
                                //増える
                                if ($ex_chapters[$index]['question_counts'] < $chap['question_counts']) {
                                    for ($j = $ex_chapters[$index]['question_counts'] + 1; $j <= $chap['question_counts']; $j++) {
                                        $question = new Question;
                                        $question->chapter_id = $chapter->id;
                                        $question->user_id = Auth::user()->id;
                                        $question->number = $j;
                                        $question->save();
                                    }
                                    //減る
                                } else {
                                    for ($j = $ex_chapters[$index]['question_counts']; $j > $chap['question_counts']; $j--) {
                                        $question = Question::where('chapter_id', $chapter->id)->where('number', $j)->get()->first();
                                        if ($question) {
                                            Task::where('question_id', $question->id)->each(function ($task) {
                                                $task->delete();
                                            });
                                            $question->delete();
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    //章の数が減る場合
                    //減った章と問題を削除する
                    foreach ($request->input('chapters') as $index => $chap) {

                        $chapter = Chapter::where('workbook_id', $workbook->id)->where('number', $chap['number'])->get()->first();
                        if ($chapter) {
                            $chapter->question_counts = $chap['question_counts'];
                            $chapter->save();
                            //増える
                            if ($ex_chapters[$index]['question_counts'] < $chap['question_counts']) {
                                for ($j = $ex_chapters[$index]['question_counts'] + 1; $j <= $chap['question_counts']; $j++) {
                                    $question = new Question;
                                    $question->chapter_id = $chapter->id;
                                    $question->user_id = Auth::user()->id;
                                    $question->number = $j;
                                    $question->save();
                                }
                                //減る
                            } else {
                                for ($j = $ex_chapters[$index]['question_counts']; $j > $chap['question_counts']; $j--) {
                                    $question = Question::where('chapter_id', $chapter->id)->where('number', $j)->get()->first();
                                    if ($question) {
                                        Task::where('question_id', $question->id)->each(function ($task) {
                                            $task->delete();
                                        });
                                        $question->delete();
                                    }
                                }
                            }
                        }
                    }
                    for ($j = $ex_chapter_counts; $j > $request->input('chapter_counts'); $j--) {
                        $chapter = Chapter::where('workbook_id', $workbook->id)->where('number', $j)->get()->first();
                        $chapter->questions->each(function ($question) {
                            Task::where('question_id', $question->id)->each(function ($task) {
                                $task->delete();
                            });
                            $question->delete();
                        });
                        $chapter->delete();
                    }
                }
            }
            $workbook->finished_question_counts = Question::where('user_id', Auth::user()->id)
                ->whereHas('chapter', function ($chapter) use ($workbook) {
                    $chapter->where('workbook_id', $workbook->id);
                })
                ->where('is_finished', true)
                ->get()
                ->count();
            $workbook->save();
            //Resultも読み直し
            Result::where('user_id', '=', Auth::user()->id)->update([
                'workbook_counts' => Auth::user()->workbooks->count(),
                'finished_workbook_counts' => Auth::user()->workbooks->where('is_finished', true)->count(),
                'question_counts' => Auth::user()->workbooks->sum('question_counts'),
                'finished_question_counts' => Auth::user()->workbooks
                    ->sum('finished_question_counts')
            ]);


            return response()->json([
                'status' => 200,
                'message' => 'workbook updated successfully!'
            ]);
        }
    }



    /**
     * 問題集を削除する。
     * 章と問題とタスクも自動削除する。
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $workbook = Workbook::where('user_id', Auth::user()->id)->find($id);
        if (!is_null($workbook)) {
            $workbook->delete();
            return response()->json([
                'status' => 200,
                'message' => 'workbook removed successfully!'
            ]);
        }
    }

    public function getList()
    {
        $workbooks = Workbook::where('user_id', Auth::user()->id)
            ->with(['chapters' => function ($chapter) {
                $chapter->with(['questions']);
            }])->get();
        if (!$workbooks->isEmpty()) {
            return response()->json([
                'status' => 200,
                'workbookList' => $workbooks,
                'message' => 'get workbookList successfully!'
            ]);
        } else {
            return response()->json([
                'status' => 200,
                'workbookList' => [],
                'message' => 'get none of workbookList successfully!'
            ]);
        }
    }

    public function detail($id)
    {
        $workbook = Workbook::where('user_id', Auth::user()->id)
            ->where('id', $id)
            ->with(['chapters' => function ($chapter) {
                $chapter->with(['questions' => function ($question) {
                    $question->with(['tasks' => function ($tasks) {
                        $tasks->where('done_at', null)->orderBy('planned_at', 'asc');
                    }]);
                }]);
            }])
            ->first();
        if (!is_null($workbook)) {
            return response()->json([
                'status' => 200,
                'workbook' => $workbook,
                'message' => 'get workbook detail successfully!'
            ]);
        } else {
            $data = ['page not found'];
            throw new HttpResponseException(response()->json($data, 404));
        }
    }
}
