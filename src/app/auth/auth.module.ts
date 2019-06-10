import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
// import { RandomGuard } from './guards/random.guard';
import { TokenInterceptor } from './token.interceptor';
import { RoleGuard } from './guards/role.guard';

@NgModule({
    providers: [
        AuthGuard,
        AuthService,
        RoleGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        // MatButtonModule,
        // MatFormFieldModule,
        // MatInputModule
    ]
})
export class AuthModule { }