import { useEffect, useState } from 'react'

import Head from 'next/head'

import { BackgroundImage1, BackgroundImage2, GradientBackgroundCon, FooterCon, FooterLink, RedSpan, QuoteGeneratorCon, QuoteGeneratorInnerCon, QuoteGeneratorTitle, QuoteGeneratorSubTitle, GenerateQuoteButton, GenerateQuoteButtonText } from '@/components/QuoteGenerator/QuoteGeneratorElements'
import Clouds1 from "../assets/cloud-and-thunder.png"
import Clouds2 from "../assets/cloudy-weather.png"

export default function Home() {
  const [numberOfQuotes, setNumberOfQuotes] = useState<Number | null>(0)

  return (
    <>
      <Head>
        <title>Inspirational Quote Generator</title>
        <meta name="description" content="A fun project to generate quotes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Background */}
      <GradientBackgroundCon>
        {/* Quote Generator Modal Pop-Up */}

        {/* Quote Generator */} 
        <QuoteGeneratorCon>
          <QuoteGeneratorInnerCon>
            
            <QuoteGeneratorTitle>
              Daily Inspirational Generator
            </QuoteGeneratorTitle>

            <QuoteGeneratorSubTitle>
              Looking for a splash of inspiration? 
              Generate a quote card with a random inspirational quote provided by <FooterLink href="https://zenquotes.io/" target="_blank" rel="noopener noreferrer">ZenQuotes API</FooterLink>.
            </QuoteGeneratorSubTitle>

            <GenerateQuoteButton>
              <GenerateQuoteButtonText>
                Make a Quote
              </GenerateQuoteButtonText>
            </GenerateQuoteButton>
          </QuoteGeneratorInnerCon>
        </QuoteGeneratorCon>

        {/* Background Images */}
        <BackgroundImage1 src={Clouds1} alt="cloudybackground1" height="300" />
        <BackgroundImage2
          src={Clouds2}
          alt="cloudybackground2"
          height="300"
        />
      </GradientBackgroundCon>

      {/* Footer */}
      <FooterCon>
        <>
          Quotes Generated: {numberOfQuotes}
          <br />
          Developed with <RedSpan>💙</RedSpan> by <FooterLink href="https://github.com/RohitShah1706">@RohitShah1706</FooterLink>
        </>
      </FooterCon>
    </>
  )
}
