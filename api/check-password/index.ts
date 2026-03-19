import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { password } = req.body;
  
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are a cybersecurity expert. Analyze the strength of the provided password. Return a JSON object with: 'score' (0-6), 'label' (e.g., 'Weak', 'Strong'), 'color' (hex code or CSS color), and 'feedback' (a short sentence explaining the strength/improvements). BE CONCISE."
          },
          {
            role: "user",
            content: `Analyze this password: ${password}`
          }
        ],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();
    const analysis = JSON.parse(data.choices[0].message.content);
    res.json(analysis);
  } catch (error: any) {
    console.error('DeepSeek API Error:', error);
    res.status(500).json({ error: 'Error analyzing password strength', details: error.message });
  }
}
