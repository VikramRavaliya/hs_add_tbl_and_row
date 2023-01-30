import express from 'express';
import dotenv from 'dotenv';

import hubspot from '@hubspot/api-client';
dotenv.config();

const hubspotClient = new hubspot.Client({ "accessToken": process.env.ACCESS_TOKEN });


class RowController {

    create = async (req, res) => {

        const values = {
            "text_column": "sample text value",
        };
        const HubDbTableRowV3Request = { path: "demo_path", name: "test_title", values };
        const tableIdOrName = process.env.TABLE_NAME_OR_ID;

        try {
            const apiResponse = await hubspotClient.cms.hubdb.rowsApi.createTableRow(tableIdOrName, HubDbTableRowV3Request);
            // console.log(JSON.stringify(apiResponse.body, null, 2));
            res.status(200).send(apiResponse);
        } catch (e) {
            e.message === 'HTTP request failed'
                ? console.error(JSON.stringify(e.response, null, 2))
                : console.error(e)
        }
    };

    getRow = async (req, res) => {
        const tableIdOrName = process.env.TABLE_NAME_OR_ID;
        const sort = undefined;
        const after = undefined;
        const limit = undefined;
        const properties = undefined;

        try {
            const apiResponse = await hubspotClient.cms.hubdb.rowsApi.readDraftTableRows(tableIdOrName, sort, after, limit, properties);
            // console.log(JSON.stringify(apiResponse.body, null, 2));
            res.status(200).send(apiResponse);
        } catch (e) {
            e.message === 'HTTP request failed'
                ? console.error(JSON.stringify(e.response, null, 2))
                : console.error(e)
        }
    };

    update = async (req, res) => {

        const values = {
            "text_column": "this sample text value updated by vikram",
        };
        const HubDbTableRowV3Request = { path: "test_path", name: "test_title", values };
        const tableIdOrName = process.env.TABLE_NAME_OR_ID;
        const rowId = process.env.ROW_ID;

        try {
            const apiResponse = await hubspotClient.cms.hubdb.rowsApi.updateDraftTableRow(tableIdOrName, rowId, HubDbTableRowV3Request);
            // console.log(JSON.stringify(apiResponse.body, null, 2));
            res.status(200).send(apiResponse);
        } catch (e) {
            e.message === 'HTTP request failed'
                ? console.error(JSON.stringify(e.response, null, 2))
                : console.error(e)
        }
    };

    BatchUpdate = async (req, res) => {
        const BatchInputJsonNode = { inputs: [{ "properties": { "test_column": "this sample text value updated by vikram 1", "test_column": "this sample text value updated by vikram 2" } }] };
        const tableIdOrName = process.env.TABLE_NAME_OR_ID;;

        try {
            const apiResponse = await hubspotClient.cms.hubdb.rowsBatchApi.batchUpdateDraftTableRows(tableIdOrName, BatchInputJsonNode);
            // console.log(JSON.stringify(apiResponse.body, null, 2));
            res.status(200).send(apiResponse);
        } catch (e) {
            e.message === 'HTTP request failed'
                ? console.error(JSON.stringify(e.response, null, 2))
                : console.error(e)
        }
    }

    delete = async (req, res) => {

        const tableIdOrName = process.env.TABLE_NAME_OR_ID;
        const rowId = process.env.ROW_ID;

        try {
            const apiResponse = await hubspotClient.cms.hubdb.rowsApi.purgeDraftTableRow(tableIdOrName, rowId);
            // console.log(JSON.stringify(apiResponse.body, null, 2));
            res.status(200).send(apiResponse);
        } catch (e) {
            e.message === 'HTTP request failed'
                ? console.error(JSON.stringify(e.response, null, 2))
                : console.error(e)
        }
    }

}

export default new RowController;