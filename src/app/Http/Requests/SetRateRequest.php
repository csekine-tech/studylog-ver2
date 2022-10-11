<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\ApiRequest;


class SetRateRequest extends ApiRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'id'=>['required'],
            'done_at'=>['required','date'],
            'rate'=>['required','integer','between:1,4'],
        ];
    }

    public function attributes()
    {
        return [
            'id'=>'タスク',
            'done_at'=>'完了日',
            'rate'=>'評価',
        ];
    }


}
