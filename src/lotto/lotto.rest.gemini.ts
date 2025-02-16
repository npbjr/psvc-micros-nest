import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

@Injectable()
export class LottoAIService {
  private readonly url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.AI_API_KEY}`;

  async checkLottoNumbers(aiQuery:string, lottoResult:string): Promise<any> {
    const data = JSON.stringify({
      "contents": [
        {
          "parts": [
            {
              "text": `${aiQuery}: based from these below data ${lottoResult} return plain text`
            }
          ]
        }
      ]
    });

    const config: AxiosRequestConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: this.url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      return JSON.stringify(response.data.candidates[0].content.parts[0].text)
    } catch (error) {
      return "no result"
    }
  }
}
