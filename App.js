$(document).ready(function () {
    let conditions = [];
    let editIndex = -1;

    function renderTable() {
        const tbody = $("#output-table tbody");
        tbody.empty();
        conditions.forEach((condition, index) => {
            tbody.append(`
                <tr>
                    <td>${index}</td>
                    <td>${condition.field}</td>
                    <td>${condition.operator}</td>
                    <td>${condition.value}</td>
                    <td>
                        <button class="edit-button" data-index="${index}">Edit</button>
                        <button class="delete-button" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `);
        });
    }

    function resetForm() {
        $("#field").val('');
        $("#operator").val('');
        $("#value").val('');
        $("#conjunction").val('');
        $("#add-button").text('Add');
        editIndex = -1;
    }

    $("#add-button").click(function () {
        const field = $("#field").val();
        const operator = $("#operator").val();
        const value = $("#value").val();
        const conjunction = $("#conjunction").val();

        if (field && operator && value && conjunction) {
            const condition = { field, operator, value, conjunction };
            if (editIndex === -1) {
                conditions.push(condition);
                resetForm();
            } else {
                conditions[editIndex] = condition;
                resetForm();
            }
            renderTable();
        } else {
            alert("All fields are required.");
        }
    });

    $("#save-button").click(function () {
        $("#json-output").text(JSON.stringify(conditions, null, 2));
    });

    $(document).on('click', '.edit-button', function () {
        editIndex = $(this).data('index');
        const condition = conditions[editIndex];
        $("#field").val(condition.field);
        $("#operator").val(condition.operator);
        $("#value").val(condition.value);
        $("#conjunction").val(condition.conjunction);
        $("#add-button").text('Edit');
    });

    $(document).on('click', '.delete-button', function () {
        const index = $(this).data('index');
        conditions.splice(index, 1);
        renderTable();
    });
});
