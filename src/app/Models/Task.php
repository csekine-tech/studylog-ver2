<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Question;
use Illuminate\Support\Facades\Auth;
use App\Models\AutoTaskSetting;

class Task extends Model
{
    use HasFactory;

    // public function workbook()
    // {
    //     return $this->hasOneThrough(Workbook::class, Question::class);
    // }
    public function chapter()
    {
        return $this->hasOneThrough(Chapter::class, Question::class);
    }
    public function question()
    {
        return $this->belongsTo(Question::class);
    }
    public function workbook()
    {
        return $this->chapter()->workbook();
    }

    protected $appends = ['workbook_name'];
    public function getWorkbookNameAttribute()
    {
        return $this->question->chapter->workbook->name;
    }
    public static function boot()
    {
        parent::boot();
    }
}
