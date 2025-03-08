<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MassageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    private $chatdata ;
    public function __construct($chatdata)
    {
        $this->chatdata = $chatdata ;
    }
    public function broadcastAs()
    {
        return 'getchatMessage';
    }
    public function broadcastWith()
    {
        return ['chat'=> $this->chatdata];
    }
    public function broadcastOn()
    {
        return new PrivateChannel('broadcast-message');
    }
}
