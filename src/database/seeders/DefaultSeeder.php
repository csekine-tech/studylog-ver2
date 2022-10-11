<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use \Illuminate\Support\Facades\DB;


class DefaultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //subjectsテーブルデータを作成
        $subjects = ['英語', '数学', '物理', '化学', '生物', '現代文', '古文', '漢文', '日本史', '世界史', '地理'];
        $colors = ['red', 'blue', 'amber', 'green', 'purple', 'pink', 'd-purple', 'lime', 'orange', 'l-green', 'bluegray'];
        foreach ($subjects as $index => $subject) {
            $insertedSubject = [
                'name' => $subject,
                'color_name' => $colors[$index],
                'created_at' => now(),
                'updated_at' => now()
            ];
            DB::table('subjects')->insert($insertedSubject);
        }

        //userテーブルデータを作成
        DB::table('users')->insert([
            'name' => 'test',
            'email' => 'test@test.com',
            'password' => '$2y$10$knrlUOW/hqqi8cuBNaCvnO/zA6yce0FtKbSpbazn6OttJGLfgb5YC',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('users')->insert([
            'name' => 'guest',
            'email' => 'guest@guest.com',
            'password' => '$2y$10$BaLdkzCwDfw.PgYS9WYpYO01Dn.yTkLkPGMHP8oQGPmkH4F.casya',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('users')->insert([
            'name' => 'test2',
            'email' => 'test2@test.com',
            'password' => '$2y$10$knrlUOW/hqqi8cuBNaCvnO/zA6yce0FtKbSpbazn6OttJGLfgb5YC',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        DB::table('users')->insert([
            'name' => 'test3',
            'email' => 'test3@test.com',
            'password' => '$2y$10$knrlUOW/hqqi8cuBNaCvnO/zA6yce0FtKbSpbazn6OttJGLfgb5YC',
            'created_at' => now(),
            'updated_at' => now()
        ]);

        //auto task settingsテーブルデータを作成
        //ユーザーごとにauto_set_dayを変える場合は変更する
        $data = [
            [
                'user_id' => '1',
                'rate' => 1,
                'auto_set_day' => 3,
                'created_at' => now(),
                'updated_at' => now()
            ], [
                'user_id' => '1',
                'rate' => 2,
                'auto_set_day' => 7,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'user_id' => '1',
                'rate' => 3,
                'auto_set_day' => 14,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'user_id' => '1',
                'rate' => 4,
                'auto_set_day' => null,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];
        foreach ($data as $item) {
            DB::table('auto_task_settings')->insert($item);
        }
    }
}
