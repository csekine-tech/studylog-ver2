<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Chapter;
use App\Models\AutoTaskSetting;
use App\Models\Workbook;
use Illuminate\Support\Facades\Auth;
use App\Models\Result;

class Question extends Model
{
    use HasFactory;

    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }
    public function tasks()
    {
        return $this->hasMany(Task::class);
    }
    public function workbook()
    {
        return $this->chapter->workbook;
    }

    protected $appends = ['workbook_name', 'planned_tasks'];
    public function getWorkbookNameAttribute()
    {
        return $this->chapter->workbook->name;
    }
    public function getPlannedTasksAttribute()
    {
        // return $this->tasks;
        // if ($this->tasks) {
        // return $this->tasks->where('done_at', null)->get();
        // } else {
        // return [];
        // }
    }

    public static function boot()
    {
        parent::boot();
        static::updated(function ($question) {
            if ($question->is_finished === true) {
                $q_count = Question::where('chapter_id', $question->chapter_id)->where('is_finished', false)->get()->count();
                if ($q_count === 0) {
                    $chapter = Chapter::find($question->chapter_id);
                    $chapter->is_finished = true;
                    $chapter->save();
                }

                $workbook = Workbook::where('user_id', Auth::user()->id)->find($question->chapter->workbook_id);
                $workbook->finished_question_counts = Question::where('user_id', Auth::user()->id)
                    ->whereHas('chapter', function ($chapter) use ($workbook) {
                        $chapter->where('workbook_id', $workbook->id);
                    })
                    ->where('is_finished', true)
                    ->get()
                    ->count();
                $workbook->save();
                $result = Result::where('user_id', Auth::user()->id)->first();
                $result->finished_question_counts = Workbook::where('user_id', Auth::user()->id)->get()->sum('finished_question_counts');
                $result->save();
            }
        });
    }
}
