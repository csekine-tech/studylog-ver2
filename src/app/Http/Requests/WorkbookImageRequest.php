<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\ApiRequest;


class WorkbookImageRequest extends ApiRequest
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
            'image'=>['required','max:10240','mimes:jpg,jpeg,png,gif']
        ];
    }

    public function attributes()
    {
        return [
            'id'=>'問題集',
            'image'=>'画像'
        ];
    }
}
