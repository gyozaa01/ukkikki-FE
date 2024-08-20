import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const logoImage = `${process.env.PUBLIC_URL}/monkeys.png`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
    overflow: hidden;
`;

const BackgroundImageLeft = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: calc(50% - 187.5px); /* 50%에서 AppWrapper의 절반을 뺀 값 */
    height: 100%;
    background-image: url('/left.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: left center;
`;

const BackgroundImageRight = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: calc(50% - 187.5px); /* 50%에서 AppWrapper의 절반을 뺀 값 */
    height: 100%;
    background-image: url('/right.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right center;
`;

const AppWrapper = styled.div`
    width: 100%;
    max-width: 375px;
    height: 100vh;
    background-color: #A2CA71;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;
`;

const Logo = styled.img`
    width: 200px;
    margin-top: 60%;
    margin-bottom: 20%;
`;

const Input = styled.input`
    width: 80%;
    padding: 15px;
    margin-bottom: 5%;
    border: 1px solid #DEDEDE;
    border-radius: 5px;
    font-size: 20px;
`;

const SendTempPasswordButton = styled.button`
    background-color: #387F39;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 35px;
    width: 90%;
    margin-bottom: 20px;

    &:hover {
        color: black;
    }
`;

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: #FEFEFE;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    width: 80%;
    max-width: 300px;
`;

const ModalText = styled.p`
    font-size: 20px;
    margin-bottom: 10px;
`;

const ModalButton = styled.button`
    background-color: #FFD8E1;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 25px;
    margin-top: 20px;

    &:hover {
        color: #FF86FF;
    }
`;

const SendTempPassword = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [tempPasswordSent, setTempPasswordSent] = useState(false);

    const handleSendTempPasswordClick = async () => {
        try {
            // 실제로는 API 호출
            console.log(`Sending temporary password to ${email}...`);

            // API 호출이 성공했다고 가정하고, 모달 열기 및 상태 업데이트
            setTempPasswordSent(true);
            setModalOpen(true);
        } catch (error) {
            // API 호출 실패 처리
            console.error('Failed to send temporary password:', error);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
        setTempPasswordSent(false);
        setEmail('');
    };

    const handleLoginButtonClick = () => {
        // 로그인 페이지로 이동
        navigate('/login');
        closeModal();
    };

    return (
        <Container>
            <BackgroundImageLeft />
            <BackgroundImageRight />
            <AppWrapper>
                <Logo src={logoImage} alt="Logo" />
                <Input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <SendTempPasswordButton onClick={handleSendTempPasswordClick}>임시 비밀번호 전송</SendTempPasswordButton>

                {modalOpen && (
                    <ModalBackdrop>
                        <ModalContent>
                            {tempPasswordSent ? (
                                <>
                                    <ModalText>임시 비밀번호가 전송되었습니다.</ModalText>
                                    <ModalButton onClick={handleLoginButtonClick}>로그인하기</ModalButton>
                                </>
                            ) : (
                                <ModalText>임시 비밀번호 전송에 실패했습니다.</ModalText>
                            )}
                        </ModalContent>
                    </ModalBackdrop>
                )}
            </AppWrapper>
        </Container>
    );
};

export default SendTempPassword;