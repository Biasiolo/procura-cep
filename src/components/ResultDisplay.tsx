import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  width: 50%; /* Largura relativa ao pai */
  max-width: 1200px; /* Largura máxima para evitar que o container fique muito largo */
  box-sizing: border-box; /* Inclui padding e border na largura total */
  display: flex; /* Para centralizar itens se necessário */
  align-items: center;
  justify-content: center; /* Para centralizar itens se necessário */
  flex-direction: column;
`

interface Address {
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  cep: string
}

interface Props {
  address: Address | null
}

const ResultDisplay: React.FC<Props> = ({ address }) => {
  if (!address) return null

  return (
    <Container>
      <h2>{address.cep}</h2>
      <h2>
        <strong>Endereço:</strong> {address.logradouro}
      </h2>
      <p>
        <strong>Bairro:</strong> {address.bairro}
      </p>
      <p>
        <strong>Cidade:</strong> {address.localidade}
      </p>
      <p>
        <strong>Estado:</strong> {address.uf}
      </p>
      <p>
        <strong>CEP:</strong> {address.cep}
      </p>
    </Container>
  )
}

export default ResultDisplay
