import Head from 'next/head'
import { useState } from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import Page from '@/components/shared/Layouts/Page'
import { Button } from '@/components/chat/Button'

export default function NameMyPet() {
  const [loading, setLoading] = useState(false)
  const [animalInput, setAnimalInput] = useState('')
  const [result, setResult] = useState()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      setLoading(true)
      const response = await fetch('/api/name-my-pet/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ animal: animalInput }),
      })

      const data = await response.json()
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }

      setResult(data.result)
      setAnimalInput('')
      setLoading(false)
    } catch (err) {
      const error = err as Error
      // Consider implementing your own error handling logic here
      console.error(error)
      alert(error.message)
      setLoading(false)
    }
  }

  return (
    <Page title="Name my pet">
      <Head>
        <title>Name My Pet</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <div className="flex flex-col">
        <Image
          src="/dog.png"
          alt="Website Logo"
          width={34}
          height={34}
          className={styles.icon}
        />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit} className="flex flex-col">
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <Button type="submit">
            {loading ? 'Generating...' : 'Generate names'}
          </Button>
        </form>
        <div className={styles.result}>{result}</div>
      </div>
    </Page>
  )
}
