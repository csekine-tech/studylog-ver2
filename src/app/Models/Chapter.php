<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Workbook;
use App\Models\Result;
use Illuminate\Support\Facades\Auth;

class Chapter extends Model
{
    use HasFactory;
    public function workbook()
    {
        return $this->belongsTo(Workbook::class);
    }
    public function questions()
    {
        return $this->hasMany(Question::class);
    }
    public function tasks()
    {
        return $this->hasManyThrough(Task::class, Question::class);
    }

    protected $appends = ['workbook_name'];
    public function getWorkbookNameAttribute()
    {
        return $this->workbook->name;
    }
    public static function boot()
    {
        parent::boot();
        static::updated(function ($chapter) {
            $workbook = Workbook::find($chapter->workbook_id);

            if ($chapter->is_finished === true) {
                $c_count = Chapter::where('workbook_id', $chapter->workbook_id)->where('is_finished', false)->get()->count();
                if ($c_count === 0) {
                    $workbook->is_finished = true;
                    $workbook->save();

                }
            }
        });
    }
}
