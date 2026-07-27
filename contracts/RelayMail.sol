// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract RelayMail {
    struct Mail {
        uint256 id;
        address from;
        address to;
        string subject;
        string message;
        uint256 timestamp;
    }

    uint256 private nextMailId;

    mapping(address => Mail[]) private inbox;
    mapping(address => Mail[]) private sent;

    event MailSent(
        uint256 indexed id,
        address indexed from,
        address indexed to,
        uint256 timestamp
    );

    function sendMail(
        address to,
        string calldata subject,
        string calldata message
    ) external {
        require(to != address(0), "Invalid recipient");
        require(bytes(message).length <= 280, "Message too long");

        Mail memory mail = Mail({
            id: nextMailId,
            from: msg.sender,
            to: to,
            subject: subject,
            message: message,
            timestamp: block.timestamp
        });

        sent[msg.sender].push(mail);
        inbox[to].push(mail);

        emit MailSent(
            nextMailId,
            msg.sender,
            to,
            block.timestamp
        );

        nextMailId++;
    }

    function getInbox(address user)
        external
        view
        returns (Mail[] memory)
    {
        return inbox[user];
    }

    function getSent(address user)
        external
        view
        returns (Mail[] memory)
    {
        return sent[user];
    }
}