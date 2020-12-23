import React, { FC, useState, useEffect, useContext } from 'react';
import cn from './style.module.sass';
import { UIStoreContext } from '../../../contexts/uistore.context';
import { Notification } from '../../../models/global/include/NotificationsService';
import { observer } from 'mobx-react';
import clsx from 'clsx';

interface UINotificationsProps {}

interface NotificationType extends Notification {
    show: boolean;
    hide: boolean;
}

const UINotification: FC<UINotificationsProps> = observer(({}) => {
    const { notifications }: any = useContext(UIStoreContext);

    const [thisNotifications, setNotifications] = useState<
        Array<NotificationType>
        >([]);

    const closeText = 'Закрыть уведомление';
    let notificationsTimer: number | undefined;

    useEffect(() => {
        if (notifications.notificationsAreShown) {
            notificationsTimer = setInterval(notificationsWatcher, 1500);
        }
        return () => {
            clearInterval(notificationsTimer);
        };
    }, [notifications.notificationsAreShown]);

    useEffect(() => {
        if (
            notifications.notificationsAreShown &&
            !notifications.hasNotifications &&
            thisNotifications.length === 0
        ) {
            notifications.hideNotifications();
        }
    }, [thisNotifications]);

    const notificationsWatcher = () => {
        if (!notifications.notificationsAreShown) {
            clearInterval(notificationsTimer);
        } else if (
            notifications.notificationsAreShown &&
            thisNotifications.length < 3 &&
            notifications.hasNotifications
        ) {
            const currentNotifiction = notifications.getFirstNotification();
            const newNotify = {
                ...currentNotifiction,
                show: false,
                hide: false,
            };
            setNotifications(prevState => [...prevState, newNotify]);
            setTimeout(() => {
                setNotifications(prevState =>
                    prevState.map(iterateNotification => {
                        return currentNotifiction.id === iterateNotification.id
                            ? {
                                ...iterateNotification,
                                show: true,
                            }
                            : iterateNotification;
                    })
                );
            }, 50);
            setTimeout(() => {
                closeWindow(currentNotifiction.id);
            }, 5050);
        }
    };

    const closeWindow = (thisId: string) => {
        setNotifications(prevState =>
            prevState.map(iterateNotification => {
                return thisId === iterateNotification.id
                    ? {
                        ...iterateNotification,
                        hide: true,
                    }
                    : iterateNotification;
            })
        );
        setTimeout(() => {
            setNotifications(prevState =>
                prevState.filter(notification => notification.id !== thisId)
            );
        }, 300);
    };

    return (
        thisNotifications.length > 0 && (
            <section className={cn.container}>
                {thisNotifications.map(notification => {
                    const {
                        id,
                        status,
                        show,
                        hide,
                        title,
                        desc,
                    } = notification;

                    return (
                        <div
                            className={clsx(
                                cn.item_container,
                                show && cn.item_container_visible
                            )}
                            key={id}
                        >
                            <div
                                className={clsx(
                                    cn.item,
                                    show && cn.item_visible,
                                    hide && cn.item_hide,
                                    status
                                )}
                            >
                                <button
                                    className={cn.close}
                                    title={closeText}
                                    type="button"
                                    onClick={() => closeWindow(id)}
                                />
                                <div className={cn.image} />
                                <div className={cn.info}>
                                    <div className={cn.title}>{title}</div>
                                    {desc && (
                                        <div className={cn.desc}>{desc}</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
        )
    );
});

export default UINotification;
