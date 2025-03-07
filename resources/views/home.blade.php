{{-- @dd($users) --}}
@extends('layouts.app')

@section('content')

<div clsss="container mt-4">
<div class="row">
    @if (count($users)>0)
    <div class="col-md-3">
        <ul class="list-group">
            @foreach ($users as $user)
            @php
                if ($user->image) {
                    $images = $user->image ;
                }else {
                    $images = 'dummy_image.png';
                }
            @endphp
            <li class="list-group-item list-group-item-dark cursor-pointer user-list button-like">
                <img src="{{asset('/images/'. $images )}}" alt="image" class="user-image">
                {{ $user->name }}
                <b><sup id="{{ $user->id }}-status" class="offline-status">offline</sup></b>
            </li>
            @endforeach
        </ul>
    </div>
    <div class="col-md-9">
        <h2 class="start-head">click to start chat</h2>
        <div class="chat-section">
            <div id="chat-container">
                {{-- this is chat massage container --}}
            </div>
            <form action="" class="chat-form">
                <input type="text" name="message" placeholder="Enter message" id="message" class="border" required>
                <input type="submit" value="send message" class="btn btn-primary">
            </form>
        </div>
    </div>
    @else
    <div class="col-md-12">
        <h2>user not found</h2>
    </div>
    @endif
</div>
</div>
@endsection
