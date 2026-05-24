import { useState } from 'react'
import { Container, Title, Button, Stack, Text, Group } from '@mantine/core'
import { FaShoppingCart, FaReact } from 'react-icons/fa'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container size="md" py="xl">
      <Stack align="center" gap="lg">
        <Group gap="md">
          <FaReact size={48} color="#61dafb" />
          <FaShoppingCart size={48} color="#7048e8" />
        </Group>

        <Title order={1}>UIShop</Title>

        <Text size="lg" c="dimmed">
          Visual Resources E-commerce Platform
        </Text>

        <Button
          size="lg"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </Button>

        <Text size="sm" c="dimmed">
          Edit <code>src/App.tsx</code> to get started
        </Text>
      </Stack>
    </Container>
  )
}

export default App
