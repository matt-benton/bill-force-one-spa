<?php

use Illuminate\Database\Seeder;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\Account::class, 10)
            ->create()
            ->each(function ($account) {
                $account->bills()->createMany(factory(App\Bill::class, 20)->make()->toArray());
            });
    }
}
