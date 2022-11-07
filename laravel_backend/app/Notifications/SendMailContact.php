<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SendMailContact extends Notification
{
    use Queueable;
    protected $tmp;
    protected $ten;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($tmp, $ten)
    {
        $this->tmp = $tmp;
        $this->ten = $ten;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->line('Chào ' . $this->ten . ' chúng tôi đã nhận được phản hồi của bạn')
            ->line("Nội dung: " . $this->tmp);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
