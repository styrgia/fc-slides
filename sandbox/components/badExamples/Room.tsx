import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import cn from './style.module.sass';
import lottie from 'lottie-web';
import animationBack from './animation-back.json';
import animationBackMobile from './animation-back-mobile.json';
import animationFront from './animation-front.json';
import coinLeftAnimation from './coin-left.json';
import coinRightAnimation from './coin-right.json';
import stars from './stars.json';
import LectureLayout from '../../layout/Lecture';
import FrameAnimation from '../../ui/FrameAnimation';
import Layout from '../../festival/Layout';
import TitleHall from '../titleHall';
import LectureLayoutState from '../../../models/chat/LectureLayoutState';
import { observer } from 'mobx-react';
import { defaultSettingsAnimation } from '../../../data/rooms/animation-settings';
import { BREAKPOINT_MOBILE_SM } from '../../../helpers/constants';
import { useMediaQuery } from 'react-responsive';
import ActivityBlock from './activityBlock';
import Socket from '../../../models/global/Socket';
import ChatItemGroup from '../../chatroom/Item';
import QuestionsItemGroup from '../../chatroom/QuestionItem';
import Chat from '../../chatroom';
import FeatureWrap from '../../utility/FeatureWrap';
import { RoomCodeContext } from '../../../contexts/roomCode.context';

const Room: FC = observer(() => {
    const roomCode = useContext(RoomCodeContext);
    const { activeElement, activeVideo } = LectureLayoutState;
    const [isDesktop, updateIsDesktop] = useState(false);
    const frontRef = useRef<HTMLDivElement>(null);
    const backRef = useRef<HTMLDivElement>(null);
    const videoId: string | null = activeVideo ? activeVideo.url.split(`?v=`)[1] : null;
    const chatSettings = {
        contextData: activeElement === 'chat' ? Socket.chatMessages : Socket.chatQuestions,
        group: activeElement === 'chat' ? ChatItemGroup : QuestionsItemGroup,
    };
    const handleChangeMedia = () => {
        if (isDesktop !== isDesktopStart) {
            updateIsDesktop(isDesktopStart);
        }
    };

    const isDesktopStart = useMediaQuery({ minDeviceWidth: BREAKPOINT_MOBILE_SM }, undefined, handleChangeMedia);

    useEffect(() => {
        handleChangeMedia();
    }, []);

    useEffect(() => {
        LectureLayoutState.fetchVideoArchive(roomCode)
            .then(() => {})
            .catch(error => console.log(error.message));
    }, []);

    useEffect(() => {
        const frontParams = {
            ...defaultSettingsAnimation,
            container: frontRef?.current,
            animationData: animationFront,
            name: 'animationFront',
        };

        const backParams = {
            ...defaultSettingsAnimation,
            container: backRef.current,
            animationData: isDesktop ? animationBack : animationBackMobile,
            name: isDesktop ? 'animationBack' : 'animationBackMobile',
        };

        if (isDesktop) {
            lottie.loadAnimation(frontParams);
            lottie.destroy('animationBackMobile');
        }

        lottie.loadAnimation(backParams);

        return () => {
            lottie.destroy('animationFront');
            lottie.destroy('animationBack');
            lottie.destroy('animationBackMobile');
        };
    }, [isDesktop]);

    const renderAnimations = () => {
        return (
            <>
                <div className={cn.coinLeft}>
                    <FrameAnimation
                        imageSrc="/img/lecture/cybergarden/coin-left.png"
                        spriteData={coinLeftAnimation}
                        fps={25}
                        scale={0.5}
                        delay={2000}
                    />
                </div>
                <div className={cn.coinRight}>
                    <FrameAnimation imageSrc="/img/lecture/cybergarden/coin-right.png" spriteData={coinRightAnimation} fps={25} delay={3300} />
                </div>
                <div className={cn.stars}>
                    <FrameAnimation imageSrc="/img/lecture/cybergarden/stars.png" spriteData={stars} fps={25} />
                </div>
            </>
        );
    };

    const scrollIcon = () => {
        return (
            <svg width="240" height="236" viewBox="0 0 240 236" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn.scrollIcon}>
                <path
                    d="M75.9162 88.2136C96.2383 86.0782 111.122 69.2085 109.16 50.5341C107.197 31.8597 89.1323 18.4522 68.8102 20.5876C48.488 22.723 33.6044 39.5927 35.5667 58.2671C37.5289 76.9415 55.594 90.349 75.9162 88.2136Z"
                    fill="#0EABC8"
                />
                <path
                    d="M81.6896 57.2415C83.4737 42.7157 80.8319 30.4382 75.789 29.8188C70.7461 29.1994 65.2117 40.4728 63.4276 54.9986C61.6435 69.5243 64.2854 81.8019 69.3283 82.4213C74.3712 83.0407 79.9056 71.7673 81.6896 57.2415Z"
                    fill="#F15438"
                />
                <path
                    d="M204.167 58.2227C206.13 39.5483 191.246 22.6786 170.924 20.5432C150.602 18.4078 132.537 31.8153 130.574 50.4897C128.612 69.1641 143.496 86.0338 163.818 88.1692C184.14 90.3046 202.205 76.8971 204.167 58.2227Z"
                    fill="#0EABC8"
                />
                <path
                    d="M170.42 82.3375C175.463 81.7181 178.105 69.4405 176.32 54.9147C174.536 40.389 169.002 29.1156 163.959 29.735C158.916 30.3543 156.274 42.6319 158.058 57.1577C159.843 71.6835 165.377 82.9568 170.42 82.3375Z"
                    fill="#F15438"
                />
                <path
                    d="M119.5 218C185.498 218 239 188.227 239 151.5C239 114.773 185.498 85 119.5 85C53.502 85 0 114.773 0 151.5C0 188.227 53.502 218 119.5 218Z"
                    fill="#0074FF"
                />
                <path
                    d="M119.5 133C163.959 133 200 103.227 200 66.5C200 29.7731 163.959 0 119.5 0C75.0411 0 39 29.7731 39 66.5C39 103.227 75.0411 133 119.5 133Z"
                    fill="#671BAA"
                />
                <path
                    d="M93.0745 84.383C104.161 84.383 113.149 73.7759 113.149 60.6914C113.149 47.607 104.161 37 93.0745 37C81.9877 37 73 47.607 73 60.6914C73 73.7759 81.9877 84.383 93.0745 84.383Z"
                    fill="white"
                />
                <path
                    d="M92.7119 84.3402C99.0045 84.3402 104.106 78.7533 104.106 71.8615C104.106 64.9697 99.0045 59.3828 92.7119 59.3828C86.4194 59.3828 81.3184 64.9697 81.3184 71.8615C81.3184 78.7533 86.4194 84.3402 92.7119 84.3402Z"
                    fill="black"
                />
                <path
                    d="M148.074 84.383C159.161 84.383 168.149 73.7759 168.149 60.6914C168.149 47.607 159.161 37 148.074 37C136.988 37 128 47.607 128 60.6914C128 73.7759 136.988 84.383 148.074 84.383Z"
                    fill="white"
                />
                <path
                    d="M147.714 84.3402C154.006 84.3402 159.107 78.7533 159.107 71.8615C159.107 64.9697 154.006 59.3828 147.714 59.3828C141.421 59.3828 136.32 64.9697 136.32 71.8615C136.32 78.7533 141.421 84.3402 147.714 84.3402Z"
                    fill="black"
                />
                <path
                    className={cn.handDownScroll}
                    d="M148.443 150.37C150.272 157.304 160.753 157.16 175.152 142.496V176.909C175.152 189.131 184.212 192.34 189.396 188.421C193.597 185.245 193.332 172.733 191.604 165.397C194.34 167.434 199.883 170.682 202.643 165.397C207.058 170.134 215.89 164.301 215.89 164.301C219.753 168.138 225.924 166.39 228.211 163.95C233.936 157.839 235.224 144.606 228.211 120.789C221.197 96.9718 190.163 104.2 180.336 108.428C171.379 112.282 164.857 120.789 156.651 130.68C150.669 137.89 146.613 143.436 148.443 150.37Z"
                    fill="white"
                />
                <path
                    opacity="0.7"
                    d="M10.4991 207.8C-9.00087 167.8 1.79916 128.4 55.3992 106.7C50.2992 80.8998 33.1992 11.2999 121.099 9.79987C193.499 8.49987 200.899 79.3998 180.399 109C201.799 109.8 245.599 132.3 238.899 187.9C232.399 243.5 31.9991 251.9 10.4991 207.8Z"
                    fill="black"
                />
            </svg>
        );
    };

    return (
        <LectureLayout isTechnoPage={true}>
            <Layout
                headerParams={{
                    shouldAlignVerticalCenter: false,
                    headerContent: activeVideo ? (
                        <TitleHall text={activeVideo?.speaker} titleAuthor={activeVideo?.name} linkData={activeVideo?.link} />
                    ) : null,
                }}
            >
                <div>
                    <div className={cn.lectureLayout}>
                        <div className={cn.sportBackground} />
                        <div ref={frontRef} className={cn.sportFront} />
                        <div className={cn.wrapper}>
                            <div ref={backRef} className={cn.sportBack} />
                        </div>
                        <div>{isDesktop && scrollIcon()}</div>

                        <div>{isDesktop && renderAnimations()}</div>

                        <div className={cn.videoContainer}>
                            <div className={cn.videoWrapper}>
                                <iframe
                                    src={`https://www.youtube.com/embed/${videoId}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                    <ActivityBlock />
                </div>
            </Layout>
            {/*<FeatureWrap isPage={false} name="chat">*/}
            {/*    /!*<Chat {...chatSettings} />*!/*/}
            {/*</FeatureWrap>*/}
        </LectureLayout>
    );
});

export default Room;
