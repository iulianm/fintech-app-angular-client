import { Component, OnInit, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ClientAccount } from "../../../client-account.model";
import { ClientAccountService } from "../../../client-account.service";
import * as ClientAccountActions from "../../../store/client-account.action";
import * as fromClientAccountList from "../../../../client-account/store/client-account.reducers";

@Component({
  selector: "app-client-account-form",
  templateUrl: "./client-account-form.component.html",
  styleUrls: ["./client-account-form.component.css"]
})
export class ClientAccountFormComponent implements OnInit {
  /* This is an example of receiving an input argument, sent from when
     the form is constructed.  */
  @Input() id: number;

  newClientAccountForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private clientAccountService: ClientAccountService,
    private store: Store<fromClientAccountList.AppState>
  ) {
    this.createForm();
  }

  ngOnInit() {}

  private createForm() {
    this.newClientAccountForm = this.formBuilder.group({
      name: "",
      country: "",
      entity: "",
      referenceCurrency: ""
    });
  }

  submitForm() {
    console.log("form has been submitted");
    this.onAddClientAccount(this.newClientAccountForm.value);
    this.activeModal.close(this.newClientAccountForm.value);
  }

  onAddClientAccount(formValues) {
    const clientName = formValues.name;
    const clientCountry = formValues.country;
    const clientEntity = formValues.entity;
    const clientReferenceCurrency = formValues.clientReferenceCurrency;

    const newClientAccount = new ClientAccount(
      clientName,
      null,
      clientCountry,
      clientEntity,
      null,
      clientReferenceCurrency,
      null,
      null,
      null,
      null,
      null
    );
    this.store.dispatch(
      new ClientAccountActions.AddClientAccount(newClientAccount)
    );
    // this.clientAccountService.addClientAccount(newClientAccount);
  }
}
