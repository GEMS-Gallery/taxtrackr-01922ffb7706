import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const addForm = document.getElementById('addTaxPayerForm');
    const searchForm = document.getElementById('searchForm');
    const taxPayerList = document.getElementById('taxPayerList');
    const searchResult = document.getElementById('searchResult');

    // Function to display all tax payers
    async function displayTaxPayers() {
        const taxPayers = await backend.getAllTaxPayers();
        taxPayerList.innerHTML = '';
        taxPayers.forEach(tp => {
            const li = document.createElement('li');
            li.textContent = `TID: ${tp.tid}, Name: ${tp.firstName} ${tp.lastName}, Address: ${tp.address}`;
            taxPayerList.appendChild(li);
        });
    }

    // Add new tax payer
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taxPayer = {
            tid: document.getElementById('tid').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value
        };
        await backend.addTaxPayer(taxPayer);
        addForm.reset();
        displayTaxPayers();
    });

    // Search for a tax payer
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tid = document.getElementById('searchTid').value;
        const result = await backend.searchTaxPayer(tid);
        if (result.length > 0) {
            const tp = result[0];
            searchResult.textContent = `Found: TID: ${tp.tid}, Name: ${tp.firstName} ${tp.lastName}, Address: ${tp.address}`;
        } else {
            searchResult.textContent = 'No TaxPayer found with that TID.';
        }
    });

    // Initial display of tax payers
    displayTaxPayers();
});
