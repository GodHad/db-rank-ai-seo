<?php

namespace App\Http\Controllers;

use App\Models\SuggestedQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class SuggestedQuestionController extends Controller
{

    public function questions(Request $request)
    {
        try {
            $random = $request->query('random');
            if ($random) {
                $questions = SuggestedQuestion::inRandomOrder()->limit(4)->get();
            } else {
                $questions = SuggestedQuestion::all();
            }
            return response()->json(['success' => true, 'questions' => $questions]);
        } catch (\Exception $th) {
            return response()->json(['success' => false, 'error' => $th->getMessage()]);
        }
    }

    public function create(Request $request)
    {
        try {
            $data = $request->all();
            $validator = Validator::make($data, [
                'question' => ['required', 'string', 'max:255'],
            ]);
            
            if ($validator->fails()) return response()->json(['success' => false, 'errors' => $validator->errors()]);

            SuggestedQuestion::create($validator->validated());

            return response()->json(['success' => true]);
        } catch (\Exception $th) {
            return response()->json(['success' => false, 'error' => $th->getMessage()]);
        }
    }

    public function update(Request $request)
    {
        try {
            $data = $request->all();
            $id = $request->query('id');
            $question = SuggestedQuestion::find($id);

            if (!$question) 
                return response()->json(['success' => false, 'errors' => ['shortname' => 'Question is not found']]);
            
            $validator = Validator::make($data, [
                'question' => ['required', 'string', 'max:255'],
            ]);

            if ($validator->fails()) return response()->json(['success' => false, 'errors' => $validator->errors()]);

            $question->update($validator->validated());

            return response()->json(['success' => true, 'question' => $question]);
        } catch (\Exception $th) {
            return response()->json(['success' => false, 'errors' => ['question' => $th->getMessage()]]);
        }
    }

    public function delete(Request $request)
    {
        try {
            $id = $request->query('id');
            $question = SuggestedQuestion::find($id);

            if (!$question)
                return response()->json(['success' => false, 'errors' => [ 'Question is not found']], 422);

            $question->delete();
            return response()->json(['success' => true]);
        } catch (\Exception $th) {
            return response()->json(['success' => false, 'errors' => ['question' => $th->getMessage()]]);
        }
    }

    public function render(): InertiaResponse
    {
        return Inertia::render('admin/suggested-questions');
    }
}
