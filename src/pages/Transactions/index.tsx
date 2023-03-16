import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary/summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighlight, TranactionsContainer, TransactionsTable } from "./styles";

interface Transactions {
    id: number,
    description: string;
    type: 'income' | 'outcome';
    price: number,
    category: string,
    createdAt: string
}

export function Transactions() {
    const [transactions, setTransactions] = useState<Transactions[]>([])

    async function loadTransactions() {
        const response = await fetch('http://localhost:3000/transactions')
        const data = await response.json();
        setTransactions(data)
    }
    useEffect(() => {
        loadTransactions();
    }, [])

    return (
        <div>
            <Header />
            <Summary />

            <TranactionsContainer>
                <SearchForm />
                <TransactionsTable>
                    <tbody>
                        {transactions.map(transaction => {
                            return (
                                <tr key={transaction.id}>
                                    <td width='40%'>{transaction.description}</td>
                                    <td>
                                        <PriceHighlight variant={transaction.type}>
                                            {transaction.price}
                                        </PriceHighlight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.createdAt}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </TransactionsTable>
            </TranactionsContainer>
        </div>
    )
}