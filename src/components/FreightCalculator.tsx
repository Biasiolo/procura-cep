import React, { useState } from 'react'
import styled from 'styled-components'

// Interface para as propriedades do ModalBackground
interface ModalBackgroundProps {
  isOpen: boolean
}

// Estilizando o fundo do modal
const ModalBackground = styled.div<ModalBackgroundProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

// Estilizando o container do modal
const ModalContainer = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
`

// Estilizando o iframe
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`

// Estilizando o botão principal
const Button = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`

// Estilizando o botão de fechar
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px;
  font-size: 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
`

const FreightCalculator: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div>
      <Button onClick={openModal}>Calcular Frete</Button>

      <ModalBackground isOpen={isModalOpen}>
        <ModalContainer>
          <CloseButton onClick={closeModal}>X</CloseButton>
          <Iframe
            src="https://www2.correios.com.br/sistemas/precosPrazos/"
            title="Calculadora de Frete dos Correios"
          />
        </ModalContainer>
      </ModalBackground>
    </div>
  )
}

export default FreightCalculator
