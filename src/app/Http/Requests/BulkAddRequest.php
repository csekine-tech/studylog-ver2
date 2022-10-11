<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BulkAddRequest extends FormRequest
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
            'start_date' => ['required', 'date'],
            'id' => ['required'],
            'day_counts' => ['required', 'integer', 'between:1,1000'],
            'off_day' => ['required', 'array', 'size:7'],
            'off_day.*'=>'boolean',
            'is_override' => ['required', 'boolean'],
        ];
    }

    public function attributes()
    {
        return [
            'start_date' => 'いつから',
            'id' => '教材',
            'day_counts' => '1日に解く問題数',
            'off_day' => 'お休みする曜日',
            'is_override' => 'すでにある予定を上書きする',
        ];
    }

}
