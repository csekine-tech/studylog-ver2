<?php

namespace App\Http\Controllers;

use Socialite;
use Illuminate\Support\Facades\Auth;
use Exception;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\LoginRequest;


class GoogleSocialiteController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect()->getTargetUrl();
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function handleCallback()
    {
        $userSocial  =   Socialite::driver('google')->stateless()->user();
        $userAcount  =   User::where(['email' => $userSocial->getEmail()])->first();

        if ($userAcount) {
            $user = User::find($userAcount->getAttribute('id'));
        } else {
            $user = User::create([
                'name'          => $userSocial->getName(),
                'email'         => $userSocial->getEmail(),
                'google_id'   => $userSocial->getId(),
            ]);
        }
        Auth::login($user);

        return ;
    }
}
