<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\ApiRequest;
use App\Models\User;
use Illuminate\Validation\Rules;


class EditUserRequest extends ApiRequest
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
            'name' => ['required', 'string', 'max:255'],
            'email' => 'required|email|unique:users,email,' . $this->user()->id,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'お名前',
            'email' => 'Email',
            'password' => 'パスワード',
        ];
    }
}
