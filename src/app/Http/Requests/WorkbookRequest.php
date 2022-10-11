<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use \Illuminate\Contracts\Validation\Validator;
use App\Http\Requests\ApiRequest;

class WorkbookRequest extends ApiRequest
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
            'workbook_name' => ['required', 'string'],
            'subject_id' => 'required|integer|digits_between:1,10',
            'has_chapter' => 'required|boolean',
            'chapter_counts' => 'required|integer|digits_between:1,30',
            'chapters.*.number' => ['required', 'integer', 'between:1,30'],
            'chapters.*.question_counts' => ['required', 'integer', 'between:1,1000'],
            'image' => ['nullable']
        ];
    }

    public function attributes()
    {
        return [
            'workbook_name' => '教材名',
            'subject_id' => '科目',
            'has_chapter' => '章構成',
            'chapter_counts' => '章番号',
            'chapters.*.number' => '章番号',
            'chapters.*.question_counts' => '問題数',
            'image' => '教材の画像'
        ];
    }

    /**
     * @param $validator
     */
    public function withValidator($validator)
    {
        // バリデーション完了後
        $validator->after(function ($validator) {
            // 入力エラーがあった場合
            if ($validator->errors()->any()) {
                // var_dump($this->wworkbook_name, $this->subject_id, $this->chapter_counts, $this->has_chapter);
            }
        });
    }
}
