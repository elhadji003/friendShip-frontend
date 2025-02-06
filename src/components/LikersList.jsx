import imgDefault from "../assets/user.png";

const LikersList = () => {

    const likers = [
        { id: 1, name: 'John Doe', profileImage: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 2, name: 'Jane Smith', profileImage: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { id: 3, name: 'Mark Johnson', profileImage: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { id: 4, name: 'Emily Davis', profileImage: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { id: 5, name: 'Michael Brown', profileImage: 'https://randomuser.me/api/portraits/men/3.jpg' },
    ];

    return (
        <div className="mt-2 flex -space-x-2">
            {likers.slice(0, 3).map(liker => (
                <img key={liker.id} src={liker.profileImage || imgDefault} alt={liker.name} className="w-8 h-8 rounded-full border border-white" title={liker.name} />
            ))}
            {likers.length > 3 && (
                <div className="relative group">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 text-sm cursor-pointer">
                        +{likers.length - 3}
                    </div>
                    <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow-md p-2 rounded-md w-40 border z-10">
                        {likers.map(liker => (
                            <div key={liker.id} className="flex items-center space-x-2 mb-1">
                                <img src={liker.profileImage || imgDefault} alt={liker.name} className="w-6 h-6 rounded-full" />
                                <span className="text-sm">{liker.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LikersList;
