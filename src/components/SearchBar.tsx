import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import styled from 'styled-components'
import InputMask from 'react-input-mask'
import ResultDisplay from './ResultDisplay'

// Definindo o schema de validação do CEP com Yup
const schema = yup.object().shape({
  cep: yup
    .string()
    .matches(/^\d{5}-\d{3}$/, 'CEP deve estar no formato 00000-000')
    .required('CEP é obrigatório')
})

// Estilizando o input e o botão com Styled Components
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  width: 100%;
`

const Input = styled(InputMask)`
  padding: 8px;
  font-size: 16px;
  width: 100%;
  max-width: 200px;
`

const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
`

interface FormData {
  cep: string
}

interface Address {
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  cep: string
}

const SearchBar: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const [address, setAddress] = useState<Address | null>(null)

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${data.cep}/json/`
      )
      setAddress(response.data)
    } catch (error) {
      console.error('Erro ao buscar o CEP:', error)
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        mask="99999-999"
        maskChar={null}
        placeholder="Digite o CEP"
        {...register('cep')}
      />
      {errors.cep && <ErrorMessage>{errors.cep.message}</ErrorMessage>}
      <Button type="submit">Buscar</Button>
      {address && <ResultDisplay address={address} />}
    </Form>
  )
}

export default SearchBar
