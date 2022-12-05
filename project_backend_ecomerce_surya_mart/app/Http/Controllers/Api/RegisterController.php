<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        // set validation
        $validator = Validator::make($request->all(), [
            'username'  => 'required',
            'email'     => 'required|email|unique:users',
            'password'  => 'required|min:8|confirmed',
        ]);

        // cek validator
        if($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // create user with eloquent
        $user = User::create([
            'username'  => $request->username,
            'email'     => $request->email,
            'password'  => bcrypt($request->password),
        ]);

        // return response JSON user is created
        if($user) {
            return response()->json([
                'success'   => true,
                'user'      => $user
            ], 201);
        }

         // return JSON process insert failed
         return response()->json([
            'success'   => false,
         ], 409);
    }
}
