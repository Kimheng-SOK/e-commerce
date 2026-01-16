<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Kimheng',
                'password' => Hash::make('heng@123'),
            ]
        );
        $admin->roles()->sync([Role::where('name', 'admin')->first()->id]);

        $manager = User::firstOrCreate(
            ['email' => 'manager@example.com'],
            [
                'name' => 'Manager User',
                'password' => Hash::make('heng@123'),
            ]
        );
        $manager->roles()->sync([Role::where('name', 'manager')->first()->id]);

        $staff1 = User::firstOrCreate(
            ['email' => 'staff1@example.com'],
            [
                'name' => 'Staff One',
                'password' => Hash::make('heng@123'),
            ]
        );
        $staff1->roles()->sync([Role::where('name', 'staff')->first()->id]);

        $staff2 = User::firstOrCreate(
            ['email' => 'staff2@example.com'],
            [
                'name' => 'Staff Two',
                'password' => Hash::make('heng@123'),
            ]
        );
        $staff2->roles()->sync([Role::where('name', 'staff')->first()->id]);
    }
}
