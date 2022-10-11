<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Result;
use Illuminate\Support\Facades\Auth;
use App\Models\Chapter;

class Workbook extends Model
{
    use HasFactory;

    public function chapters()
    {
        return $this->hasMany(Chapter::class);
    }
    public function questions()
    {
        return $this->hasManyThrough(Question::class, Chapter::class);
    }
    public function tasks()
    {
        //これで行ける？
        return $this->questions()->tasks();
    }
    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function result()
    {
        return $this->user->result;
    }

    protected $appends = ['subject_name'];
    public function getSubjectNameAttribute()
    {
        return $this->subject->name;
    }


    public static function boot()
    {
        parent::boot();

        static::created(function ($workbook) {
            //workbookを作成した際に、resultのworkbook_countsを増やす
            Result::where('user_id', '=', Auth::user()->id)->update([
                'workbook_counts' => Auth::user()->workbooks->count(),
                'question_counts' => Auth::user()->workbooks->sum('question_counts')
            ]);
        });


        static::deleting(function ($workbook) {
            //削除したworkbookに関連するchapterとquestionとtaskを削除する
            $workbook->chapters->each(function ($chapter) {
                $chapter->questions->each(function ($question) {
                    Task::where('question_id', $question->id)->each(function ($task) {
                        $task->delete();
                    });
                    $question->delete();
                });
                $chapter->delete();
            });
        });
        static::deleted(function ($workbook) {
            //workbookを削除した際に、resultのworkbook_countsを減らす
            Result::where('user_id', '=', Auth::user()->id)->update([
                'workbook_counts' => Auth::user()->workbooks->count(),
                'finished_workbook_counts' => Auth::user()->workbooks->where('is_finished', true)->count(),
                'question_counts' => Auth::user()->workbooks->sum('question_counts'),
                'finished_question_counts' => Auth::user()->workbooks
                    ->sum('finished_question_counts')
            ]);
        });

        static::updated(function ($workbook) {
            $result = Result::where('user_id', Auth::user()->id)->first();
            $result->finished_workbook_counts = Workbook::where('user_id', Auth::user()->id)
                ->where('is_finished', true)->get()->count();
            $result->save();
        });
    }
}
