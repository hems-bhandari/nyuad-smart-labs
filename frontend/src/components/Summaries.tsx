const summariesData = [
    {
    title: "Cybersecurity Vulnerabilities",
    topics: [
        {
        title: "Topic 0: Security Vulnerabilities in Robot Operating Systems (ROS)",
        content:
            "This topic explores various security threats and vulnerabilities within Robot Operating Systems (ROS) that could compromise robotic operations. Key vulnerabilities include the exploitation of weak authentication, buffer overflow attacks, and data integrity attacks through unauthorized access and message tampering. Attackers can manipulate ROS by introducing rogue nodes, intercepting sensor data, or conducting Denial of Service (DOS) and Man In The Middle (MITM) attacks. These security breaches can lead to incorrect robot navigation, unauthorized control, and potential mission failures, emphasizing the need for robust security measures in robotic systems.",
        },
        {
        title: "Topic 1: Wireless Network Hacking Techniques",
        content:
            "This topic explores various wireless network hacking techniques using tools from the Kali Linux suite, such as Airodump-NG and Airgeddon. The hacking methods are categorized into three main stages: Pre-Connection Attacks, Gaining Access, and Post-Connection Attacks. Pre-Connection Attacks involve monitoring and capturing data packets without connecting to the network, including activities like packet sniffing and deauthentication attacks. Gaining Access focuses on methods to breach network security, potentially involving cracking passwords to establish a connection. Post-Connection Attacks occur once access is gained, enabling further exploits such as Man in The Middle attacks and unauthorized SSH connections. These techniques highlight the importance of understanding network security to protect against unauthorized access and data breaches.",
        },
        {
        title: "Topic 2: Network Security and Vulnerability to DoS Attacks",
        content:
            "This topic explores various forms of network security breaches, particularly focusing on Denial-of-Service (DoS) attacks. It highlights how SYN flooding attacks exploit the TCP three-way handshake to overwhelm ROS servers, causing them to crash due to excessive, unresponded connection requests. Additionally, the topic covers other attack vectors like brute force, dictionary, and man-in-the-middle attacks that threaten router security by attempting to steal authentication credentials. It also discusses DNS spoofing and rogue access points that can alter transmitted data, undermining data integrity. The vulnerability of network architecture to such attacks is emphasized, with potential threats including botnet assaults and exploitation of protocol weaknesses that can lead to significant disruptions in network operations.",
        },
        {
        title: "Topic 3: Security Vulnerabilities in ROS Network Communication",
        content:
            "The topic discusses the security vulnerabilities inherent in the Robot Operating System (ROS) network, particularly focusing on the ROS Master's role and the authentication process. The ROS network is structured into three levels: the ROS graph, file system, and community, with the ROS Master facilitating communication between nodes. A significant security concern highlighted is the lack of robust authentication mechanisms; nodes can connect to the ROS Master using just an IP address without needing a password or access token. This vulnerability could potentially destabilize the entire ROS network if the ROS Master is compromised, as it manages all node communications and topic subscriptions.",
        },
    ],
    },
    {
    title: "Mitigation Methods",
    topics: [
        {
        title: "Topic 4: Enhancing Security in Firmware and Software Updates",
        content:
            "This topic emphasizes the importance of maintaining robust security measures during firmware and software updates, particularly for devices like the Raspberry Pi. Regular updates are crucial for patching vulnerabilities, and using secure protocols during these updates is essential to prevent attacks such as Man-in-the-Middle (MitM), which can compromise the integrity of the firmware. The Raspberry Pi Foundation recommends using the `rpi-update` tool for fetching and applying firmware updates securely from the official repository. Strengthening the update process through robust encryption and regular application of security patches is advised to protect against potential threats.",
        },
        {
        title: "Topic 5: Network Security: Intrusion Detection and Prevention Systems",
        content:
            "This topic focuses on the critical role of intrusion detection systems (IDS) and intrusion prevention systems (IPS) in network security. These systems are essential for monitoring network traffic to identify and respond to suspicious activities, including potential Denial-of-Service (DoS) attacks. The documents emphasize the deployment of both IDS and IPS to enhance security measures, alongside the use of application-layer firewalls that inspect traffic at the application level. The overall goal is to safeguard networks from unauthorized access and threats by continuously monitoring and managing network traffic.",
        },
    ],
    },
];

const Summaries = () => {
    return (
    <div>
        {summariesData.map((summary, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">{summary.title}</h2>
            <div className="space-y-4">
            {summary.topics.map((topic, idx) => (
                <div key={idx} className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-medium">{topic.title}</h3>
                <p className="text-gray-700">{topic.content}</p>
                </div>
            ))}
            </div>
        </div>
        ))}
    </div>
    );
};

export default Summaries;