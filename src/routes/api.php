<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\WorkbookController;
use App\Http\Controllers\ResultController;
use App\Http\Controllers\GoogleSocialiteController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TestController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/subjects', [SubjectController::class, 'index'])
    // ->middleware('auth')
    ->name('subjects.index');

Route::post('/workbook/store-img', [WorkbookController::class, 'storeImg'])
    ->middleware('auth');

Route::get('/workbook/store', [WorkbookController::class, 'store'])
    ->middleware('auth');

Route::post('/workbook/store', [WorkbookController::class, 'store'])
    ->middleware('auth')
    ->name('workbook.store');

Route::post('/workbook/destroy/{id}', [WorkbookController::class, 'destroy'])
    ->middleware('auth')
    ->name('workbook.destroy');

Route::post('/workbook/update/{id}', [WorkbookController::class, 'update'])
    ->middleware('auth')
    ->name('workbook.update');

Route::get('/workbooklist', [WorkbookController::class, 'getList'])
    ->middleware('auth')
    ->name('workbook.getlist');

Route::get('/workbook/{id}', [WorkbookController::class, 'detail'])
    ->middleware('auth')
    ->name('workbook.detail');

Route::get('/result', [ResultController::class, 'getResult'])
    ->middleware('auth')
    ->name('result');

Route::post('/task/store', [TaskController::class, 'store'])
    ->middleware('auth')
    ->name('task.store');

Route::post('/task/setrate', [TaskController::class, 'setRate'])
    ->middleware('auth')
    ->name('task.setRate');

Route::get('/tasklist', [TaskController::class, 'getList'])
    ->middleware('auth')
    ->name('task.getlist');

Route::post('/task/update_plan_date', [TaskController::class, 'updatePlanDate'])
    ->middleware('auth')
    ->name('task.updatePlanDate');

Route::get('/today_tasklist', [TaskController::class, 'getTodaysList'])
    ->middleware('auth')
    ->name('task.gettodayslist');

Route::post('/task/bulk-add', [TaskController::class, 'bulkAdd'])
    ->middleware('auth')
    ->name('task.bulk-add');


Route::group(['middleware' => ['session']], function () {
    Route::get('/login/google', [GoogleSocialiteController::class, 'redirectToGoogle']);
    Route::get('/login/google/callback', [GoogleSocialiteController::class, 'handleCallback']);
});
