/*
----------------------------------------------------
AgroTorch Automation Service
Version 1.0.0
----------------------------------------------------
*/

import { ExpenseRepository } from "../../repositories/ExpenseRepository.js";
import { HarvestRepository } from "../../repositories/HarvestRepository.js";
import { SalesRepository } from "../../repositories/SalesRepository.js";
import { ActivityRepository } from "../../repositories/ActivityRepository.js";

export async function executeAutomation(records) {

    if (records.expense) {

        await ExpenseRepository.create(
            records.expense
        );

    }

    if (records.harvest) {

        await HarvestRepository.create(
            records.harvest
        );

    }

    if (records.sale) {

        await SalesRepository.create(
            records.sale
        );

    }

    if (records.journal) {

        await ActivityRepository.create(
            records.journal
        );

    }

}
