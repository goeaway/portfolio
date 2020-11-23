import useTheme from "@src/hooks/use-theme";
import React, { useState } from "react";
import styled from "styled-components";
import PadTop from "../styled/pad-top";
import RectangleButton from "../styled/rectangle-button";

const ContactPage = () => {
    const [submitted, setSubmitted] = useState(false);
    const theme = useTheme();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    }

    return (
        <Container>
            {!submitted && (
                <Form onSubmit={onSubmit}>
                    <PadTop amount={4} />
                    <p>If you'd like to get in touch about anything please use the form below. Thank you.</p>
                    <Input placeholder="Name" />
                    <Input placeholder="Email" />
                    <Textarea placeholder="Message..." rows={5} />
                    <RectangleButton type="submit" color={theme.fontDark.one} backgroundColor="white">Submit</RectangleButton>
                </Form>
            )}
            {submitted && (
                <>
                    <PadTop amount={4} />
                    <p>Thank you for getting in touch!</p>
                </>
            )}
        </Container>
    );
}

export default ContactPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Form = styled.form`
    margin: 0 2rem;
    max-width: 100%;
    transition: margin 300ms ease;

    @media(min-width:${p => p.theme.breakpoints.sm}px) {
    }
`

const Input = styled.input`
    padding: .75rem;
    font-size: 16px;
    border-radius: 2px;
    border: none;
    width: 100%;
    outline: none;
    background: ${p => p.theme.background.three};
    color: ${p => p.theme.fontLight.one};
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    margin-bottom: 1rem;
`

const Textarea = styled.textarea`
    padding: .75rem;
    font-size: 16px;
    border-radius: 2px;
    border: none;
    width: 100%;
    outline: none;
    background: ${p => p.theme.background.three};
    color: ${p => p.theme.fontLight.one};
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    font-family: "Oxygen", sans-serif;
    min-width: 100%;
    max-width: 100%;
    margin-bottom: 1rem;
    resize: vertical;
    min-height: 43px;
`