<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subject;


class SubjectController extends Controller
{
    /**
     * 教科名リスト
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subjects = Subject::all();
        return response()->json([
            'status' => 200,
            'subjects' => $subjects
        ]);
    }
}
