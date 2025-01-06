

function TableHead() {
    return (
        <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-4 py-3">Client</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
            </tr>
        </thead>
    )
}


function TableBody() {
    return (
        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">

            <tr className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                            <img
                                className="object-cover w-full h-full rounded-full"
                                src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                alt=""
                                loading="lazy"
                            />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                            <p className="font-semibold">Hans Burger</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">10x Developer</p>
                        </div>
                    </div>
                </td>
                <td className="px-4 py-3 text-sm">$ 863.45</td>
                <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                        Approved
                    </span>
                </td>
                <td className="px-4 py-3 text-sm">6/10/2020</td>
            </tr>

            <tr className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                            <img
                                className="object-cover w-full h-full rounded-full"
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&facepad=3&fit=facearea&s=707b9c33066bf8808c934c8ab394dff6"
                                alt=""
                                loading="lazy"
                            />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                            <p className="font-semibold">Jolina Angelie</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Unemployed</p>
                        </div>
                    </div>
                </td>
                <td className="px-4 py-3 text-sm">$ 369.95</td>
                <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
                        Pending
                    </span>
                </td>
                <td className="px-4 py-3 text-sm">6/10/2020</td>
            </tr>

            <tr className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                            <img
                                className="object-cover w-full h-full rounded-full"
                                src="https://images.unsplash.com/photo-1551069613-1904dbdcda11?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                alt=""
                                loading="lazy"
                            />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                            <p className="font-semibold">Sarah Curry</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Designer</p>
                        </div>
                    </div>
                </td>
                <td className="px-4 py-3 text-sm">$ 86.00</td>
                <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
                        Denied
                    </span>
                </td>
                <td className="px-4 py-3 text-sm">6/10/2020</td>
            </tr>

            <tr className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                            <img
                                className="object-cover w-full h-full rounded-full"
                                src="https://images.unsplash.com/photo-1551006917-3b4c078c47c9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                alt=""
                                loading="lazy"
                            />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                            <p className="font-semibold">Rulia Joberts</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Actress</p>
                        </div>
                    </div>
                </td>
                <td className="px-4 py-3 text-sm">$ 1276.45</td>
                <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                        Approved
                    </span>
                </td>
                <td className="px-4 py-3 text-sm">6/10/2020</td>
            </tr>

            <tr className="text-gray-700 dark:text-gray-400">
                <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                        <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                            <img
                                className="object-cover w-full h-full rounded-full"
                                src="https://images.unsplash.com/photo-1546456073-6712f79251bb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                alt=""
                                loading="lazy"
                            />
                            <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                        </div>
                        <div>
                            <p className="font-semibold">Wenzel Dashington</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Actor</p>
                        </div>
                    </div>
                </td>
                <td className="px-4 py-3 text-sm">$ 863.45</td>
                <td className="px-4 py-3 text-xs">
                    <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700">
                        Expired
                    </span>
                </td>
                <td className="px-4 py-3 text-sm">6/10/2020</td>
            </tr>

        </tbody>
    )
}


function Table() {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
                <TableHead></TableHead>
                <TableBody></TableBody>
            </table>
        </div>
    )
}


export default Table;