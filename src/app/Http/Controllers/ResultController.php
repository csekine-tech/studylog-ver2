<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Result;
use Illuminate\Support\Facades\Auth;

class ResultController extends Controller
{
    public function getResult()
    {
        $result = Result::where('user_id', Auth::user()->id)->first();
        if (!is_null($result)) {
            return response()->json([
                'status' => 200,
                'result' => $result,
                'message' => 'get workbookList successfully!'
            ]);
        }
    }
}
