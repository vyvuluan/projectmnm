<?php

namespace App\Console\Commands;

use App\Models\ConfirmMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;

class LichCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'command:lich';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';
    public function __construct()
    {
        parent::__construct();
    }
    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $today = Carbon::now();
        $confirms = ConfirmMail::get();
        foreach ($confirms as $confirm) {
            if (strtotime($today) > strtotime($confirm->created_at . ' + 3 minute')) {
                $confirm->delete();
                User::where('email', $confirm->email)->delete();
            }
        }
    }
}
