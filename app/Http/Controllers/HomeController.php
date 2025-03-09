<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User ;
use App\Models\Chat ;
use App\Events\MassageEvent ;
use Exception;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $users = User::whereNotIn('id', [auth()->user()->id] )->get();
        return view('home', compact('users'));
    }
    public function save(Request $request)
    {
        // dd($request->input());
        try{
            $chat = Chat::create([
                'sender_id' => $request->s_id ,
                'receiver_id' => $request->r_id	,
                'message' => $request->msg  ,
            ]);
            event(new MassageEvent($chat));
            return response()->json(['success' => true ,'data'=> $chat]);
        } catch(\Exception $e) {
            return response()->json(['success' => false , 'msge' => $e->getMessage()]);
        }
    }
    public function loadchat(Request $request)
    {
        try{
            $prechatdata = Chat::where(function ($query) use ($request){
                $query->where('sender_id','=',$request->sender_id)
                ->orWhere('sender_id','=',$request->receiver_id);
            })->where(function ($query) use ($request){
                $query->where('receiver_id','=',$request->sender_id)
                ->orWhere('receiver_id','=',$request->receiver_id);
            })->get();
            $s = User::where('id','=',$request->sender_id)->first(['name']);
            $r = User::where('id','=',$request->receiver_id)->first(['name']);
            return response()->json(['success'=>true ,'data'=>$prechatdata ,'s'=>$s->name,'r'=>$r->name]);
        }catch (Exception $e){
            return response()->json(['success'=>false ,'msg'=>$e->getMessage()]);
        }   
    }
}
