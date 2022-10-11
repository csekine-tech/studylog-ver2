<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\ApiRequest;


class TaskRequest extends ApiRequest
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
            'workbook_id' => ['required'],
            'chapter_number' => ['required', 'integer', 'between:1,30'],
            'question_number' => ['required', 'integer', 'between:1,1000'],
            'selected_date' => ['required', 'date'],
        ];
    }

    public function attributes()
    {
        return [
            'workbook_id' => '教材',
            'chapter_number' => '章番号',
            'question_number' => '問題番号',
            'selected_date' => '予定日'
        ];
    }
}
