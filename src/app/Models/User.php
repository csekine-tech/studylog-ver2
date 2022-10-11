<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Result;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'google_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function chapters()
    {
        return $this->hasManyThrough(Chapter::class, Workbook::class);
    }
    public function workbooks()
    {
        return $this->hasMany(Workbook::class);
    }
    public function questions()
    {
        return $this->chapters->tasks;
    }
    public function auto_task_settings()
    {
        return $this->hasMany(AutoTaskSetting::class);
    }
    public function result()
    {
        return $this->hasOne(Result::class);
    }

    public static function boot()
    {
        parent::boot();

        //userを作成した際にresultを作成する
        static::created(function ($user) {
            $result = new Result;
            $result->user_id = $user->id;
            $result->save();
        });

        static::deleting(function ($user) {
            $user->workbooks->each(function ($workbook) {
                $workbook->chapters->each(function ($chapter) {
                    $chapter->questions->each(function ($question) {
                        Task::where('question_id', $question->id)->each(function ($task) {
                            $task->delete();
                        });
                        $question->delete();
                    });
                    $chapter->delete();
                });
                $workbook->delete();
            });
            $user->result->delete();
        });
    }
}
