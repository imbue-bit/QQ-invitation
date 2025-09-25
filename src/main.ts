import './styles.scss';

interface Translations {
    [key: string]: {
        title: string;
        inviteInfo: string;
        groupName: string;
        acceptButton: string;
        invalidId: string;
    };
}

const translations: Translations = {
    en: {
        title: "Group Invitation",
        inviteInfo: "You have been invited to join a group",
        groupName: "QQ Group",
        acceptButton: "Accept Invite",
        invalidId: "Invalid Group ID",
    },
    zh: {
        title: "群组邀请",
        inviteInfo: "您被邀请加入一个群组",
        groupName: "QQ 群",
        acceptButton: "接受邀请",
        invalidId: "无效的群号",
    },
};

/**
 * 动态创建并渲染邀请卡片
 * @param container - 将要渲染卡片的父元素
 * @param lang - 语言代码 ('en', 'zh', etc.)
 */
function renderInviteCard(container: HTMLElement, lang: string): void {
    const t = translations[lang] || translations.en;
    
    document.title = t.title;

    container.innerHTML = `
        <div class="invite-card">
            <div class="invite-info" id="invite-info-text">${t.inviteInfo}</div>
            <div class="group-avatar">Q</div>
            <div class="group-name">
                <span id="group-name-text">${t.groupName}</span>: <span class="group-id" id="group-id-display">...</span>
            </div>
            <button class="accept-button" id="accept-button">${t.acceptButton}</button>
        </div>
    `;

    const groupIdDisplay = document.getElementById('group-id-display') as HTMLElement;
    const acceptButton = document.getElementById('accept-button') as HTMLButtonElement;
    
    const urlParams = new URLSearchParams(window.location.search);
    const groupId = urlParams.get('groupid');

    if (groupId && /^\d+$/.test(groupId)) {
        groupIdDisplay.textContent = groupId;
        acceptButton.addEventListener('click', () => {
            const joinUrl = `mqqapi://card/show_pslcard?card_type=group&uin=${groupId}`;
            window.location.href = joinUrl;
        });
    } else {
        groupIdDisplay.textContent = t.invalidId;
        acceptButton.disabled = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app');
    if (!appContainer) {
        console.error('App container #app not found!');
        return;
    }

    const userLang = navigator.language.split('-')[0];
    renderInviteCard(appContainer, userLang);
});
