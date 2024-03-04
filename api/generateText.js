// api/generateText.js
export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const body = JSON.parse(req.body);
            const response = await fetch('https://api.openai.com/v1/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Use environment variable for the API key
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo-instruct',
                    prompt: body.prompt,
                    max_tokens: 1000
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch OpenAI');
            }

            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            console.error('OpenAI request error:', error);
            res.status(500).json({ message: 'Error fetching data from OpenAI' });
        }
    } else {
        // Handle any non-POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
