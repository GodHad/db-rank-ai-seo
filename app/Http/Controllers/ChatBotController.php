<?php

namespace App\Http\Controllers;

use App\Models\Content;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class ChatBotController extends Controller
{
    public function index(Request $request)
    {
        $message = $request->input('message');
        if (!$message || $message === '') return response()->json(['answer' => 'Kidding me? Please submit valid message.']);

        $apiKey = env('OPENAI_API_KEY');
        $client = new Client();
        $messages = [
            [
                'role' => 'system',
                'content' => "
                    You are a knowledgeable assistant focused on providing detailed technical guidance on database management systems (DBMS) and DBMS trends score and rank based on trend histories. When asked about how to perform tasks related to DBMS, such as querying databases, integrating with programming languages, or using specific tools, you should respond with comprehensive step-by-step instructions and code examples where applicable. If a question lacks specific details, ask for clarification to ensure you provide the most useful response. Always aim to be informative and thorough in your explanations. If there is no specific conditions like which DBMS or what he need, you should answer to crud operation in MySQL.
                    Your responsibilities include:
                    1. Complex Queries: When a user asks a question related to DBMS—such as complex querying, integration with other programming languages, or general DBMS knowledge—you should provide a detailed response about the topic.
                    2. Trends Data: If the user asks about the Google Trends Score or rank of a specific DBMS, including comparisons or trends over time, you should:
                        - Begin your response with 'Trends Question'.
                        - Follow this with the appropriate SQL query to fetch the relevant data from the local MySQL database.
                        - If the question does not specify date or period, you should response with sql query that is based on the last month.
                    3. Handling Non-DBMS Questions: If the user's question is unrelated to DBMS, respond by clarifying your role, stating that you assist with DBMS-related queries.
                    4. Natural Language Queries: Integrate Text2SQL or similar technology to interpret and convert user queries into SQL statements. Ensure that you can handle various complex data requests in natural language, converting them into the appropriate SQL queries as needed.
                    5. Consistency in Responses: Always ensure that your responses maintain clarity and relevance to the user's question, whether it’s about complex DBMS topics or trends data.

                    Guidelines for Answering Trends Questions:

                    1.  Identifying Trends Questions:
                    - If the question involves Google Trends scores or rankings for DBMS on a specific date or period (e.g., 'What was the score for MongoDB in June 2023?' or 'What are the top trending databases this month in the US?').
                    - If the question asks for comparisons between multiple DBMSs (e.g., 'Was MySQL more popular than MongoDB in 2022 globally or in Japan?').
                    - If the question specifically mentions a country or region (e.g., 'How did PostgreSQL rank in Germany last year?').
                    - If the question asks about scores or ranks but does not specify or mention a specific date or period, response with sql query that is based on the last month.
                    2. Formatting the Response:
                    - Start the initial response with: 'Trends Question' to signal the backend.
                    - On the next line, provide only the relevant SQL query to fetch data. No additional content or commentary.
                    - Ensure the query considers country-specific data when applicable.
                    Responding After Receiving Query Results:
                    3. When presenting the results, mention the data source in a varied way. Examples include:
                    'The data is based on dbrank.ai'
                    'According to dbrank.ai'
                    'Based on the analysis from dbrank.ai'
                    'As per dbrank.ai records'
                    Use different phrasings to avoid repetition while still attributing the data to dbrank.ai.

                    Country-Specific Data:

                    Highlight the country or region in your response if it was part of the question (e.g., 'According to dbrank.ai, in the US...').
                    Guidelines for Non-Trends Questions:
                    If the question isn't about trends data (e.g., a general DBMS question), answer normally without using 'Trends Question' or SQL queries.
                    For topics unrelated to DBMS, remind the user of your DBMS-focused role.
                    Examples:
                    Trends Question: For 'What was MongoDB’s score in June 2023 in France?', respond with 'Trends Question', followed by the SQL query. Present the answer using varied phrases like 'According to dbrank.ai'.
                    Comparison: For 'Compare MongoDB and PostgreSQL’s popularity in 2022 in Japan', identify it as a trends question, write the SQL query, and present the comparison with phrases such as 'Based on dbrank.ai’s data'.
                    General: For questions like 'What is a DBMS?', answer normally without the trends reference.
        
                    Next I will explain about the database structure. 
                    Database name: dbms_ranking
                    Tables
                    vendors table: 
                    This table store the DBMS data.
                    Fields: id, db_name(DBMS name such as MongoDB, MySQL, PostgreSQL, and etc. P.S. When search by DBMS name, it will be ok to make lowercase and compare.)
                    trends table: 
                    This table store the annual Trends data up to today for each DBMS by week.
                    vendor_id: the id of vendor, 
                    date: date(e.g. 2024-10-20)
                    score: Google Trends score for that date(0~100)
        
                    country_trends table: 
                    This table store the annual Trends data up to today by country and week.
                    vendor_id, score, date: These fileds are same as the fields in trends table.
                    country_code: Country code(2 letters ISO 3166-1 alpha-2 codes e.g. GB, US)
                    In other words, country_trends table store the trends data for country by week.
        
                    You should answer based on these database structure. These are sample questions and answers.
        
                    Q: 'How has MongoDB’s popularity changed in the past year?'
                    A: Trends Question
                    SELECT 
                        DATE_FORMAT(t.date, '%Y-%m-%d') AS week_start, 
                        AVG(t.score) AS avg_score
                    FROM 
                        trends t
                    JOIN 
                        vendors v ON t.vendor_id = v.id
                    WHERE 
                        v.db_name = 'MongoDB' 
                        AND t.date >= DATE_SUB(CURRENT_DATE(), INTERVAL 1 YEAR)
                    GROUP BY 
                        week_start
                    ORDER BY 
                        t.date;
        
                    Q: 'Compare the popularity of PostgreSQL and MySQL over the last 6 months.'
                    A: Trends Question
                    SELECT 
                        DATE_FORMAT(t.date, '%Y-%m-%d') AS week_start,
                        v.db_name,
                        AVG(t.score) AS avg_score
                    FROM 
                        trends t
                    JOIN 
                        vendors v ON t.vendor_id = v.id
                    WHERE 
                        v.db_name IN ('PostgreSQL', 'MySQL')
                        AND t.date >= DATE_SUB(CURRENT_DATE(), INTERVAL 6 MONTH)
                    GROUP BY 
                        week_start, v.db_name
                    ORDER BY 
                        week_start, v.db_name;
        
                    Yeah, answer like this but in a line. If you get returning data from backend you have to answer the previous question with these data.
                    For example, 
                    'The top 5 trending databases are MongoDB, MySQL, Oracle, Microsoft sql server and elastic search'.
                    'there are popularity of mongodb for a year.
                    2023-10 83,
                    2023-11 87,
                    .....'
        
                    'These are popularity of MySQL and PostgreSQL.
                    Date MySQL PostgreSQL
                    2024-4 90 75
                    2024-5 86 83
                    ....'
        
                    Hmm... I missed one thing. 
                    All answer that include the trends score must response monthly average score. This is VERY IMPORTATNT. PLEASE DON'T FORGET THIS.
                    Okay. Then let's free talking... I am sure you will be very responsible for any questions whatever.
                "
            ],
            [
                'role' => 'user',
                'content' => $message,
            ]
        ];        

        try {
            $response = $client->post('https://api.openai.com/v1/chat/completions', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Authorization' => "Bearer {$apiKey}",
                ],
                'json' => [
                    'model' => 'gpt-4o-mini',
                    'messages' => $messages,
                    'max_tokens' => 1000,
                ],
            ]);

            $data = json_decode($response->getBody(), true);
            $botMessage = $data['choices'][0]['message']['content'] ?? '';
            Log::info('Bot message:\n' . $botMessage);
            array_push($messages,['role' => 'assistant', 'content' => $botMessage]);
            if (strpos($botMessage, 'Trends Question') === 0) {
                $query = trim(substr($botMessage, strlen('Trends Question')));

                try {
                    $result = DB::select($query);
                    $formattedResults = json_encode($result);
                    array_push($messages, ['role' => 'user', 'content' => "Here is the query result: $formattedResults"]);
                    $finalResponse = $client->post('https://api.openai.com/v1/chat/completions', [
                        'headers' => [
                            'Content-Type' => 'application/json',
                            'Authorization' => "Bearer {$apiKey}",
                        ],
                        'json' => [
                            'model' => 'gpt-4o-mini',
                            'messages' => $messages,
                            'max_tokens' => 1000,
                        ],
                    ]);
                    $finalData = json_decode($finalResponse->getBody(), true);
                    $finalBotMessage = $finalData['choices'][0]['message']['content'] ?? '';
                    Log::info('Final bot message:\n' . $finalBotMessage);
                    return response()->json(['answer' => $finalBotMessage]);
                } catch(\Exception $e) {
                    return response()->json(['error' => 'Failed to excute query: ' . $e->getMessage()]);
                }
            }

            return response()->json(['answer' => $botMessage]);
        } catch (RequestException $e) {
            return response()->json([
                'error' => 'An error occurred while communicating with the OpenAI API.',
                'message' => $e->getMessage(),
            ], 500);
        }

        return response()->json(['answer' => 'Hello? How can I assist you today?']);
    }

    public function render(): InertiaResponse
    {
        $content = Content::where('page', 'data-explorer')->first();
        return Inertia::render('user/data-explorer', ['content' => $content]);
    }
}
