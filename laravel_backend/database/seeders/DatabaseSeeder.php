<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ChucVu;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        ChucVu::insert([
            ['ten' => 'Admin'],
            
        ]);
        ChucVu::insert([
            ['ten' => 'Thủ kho'],
            
        ]);
        ChucVu::insert([
            ['ten' => 'Nhân viên bán hàng'],
            
        ]);
        User::insert([
            ['username' => 'admin113',
            'password' => Hash::make('admin113'),
            'email' => 'admin113@gmail.com',
            'role_id' => 2]

            
        ]);
    }
}
